-- Fitness coaching platform schema + RLS policies

create type user_role as enum ('coach', 'client');
create type subscription_tier as enum ('none', 'low_ticket', 'high_ticket');
create type subscription_status as enum ('inactive', 'active', 'past_due', 'canceled');
create type session_status as enum ('requested', 'confirmed', 'completed', 'canceled');

-- profiles --------------------------------------------------------------

create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role user_role not null default 'client',
  name text,
  avatar_url text,
  subscription_status subscription_status not null default 'inactive',
  subscription_tier subscription_tier not null default 'none',
  created_at timestamptz not null default now()
);

-- helper: is the current user a coach? Security definer so it can read
-- profiles without re-triggering the calling policy (avoids recursion) —
-- runs with the privileges of the function owner (postgres), which bypasses
-- RLS, the standard Supabase pattern for this kind of role check.
create or replace function is_coach()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'coach');
$$;

alter table profiles enable row level security;

-- Own profile, the (single) coach's profile is visible to any signed-in
-- client (needed to start a message thread), and coaches can see everyone.
create policy "profiles_select" on profiles
  for select using (
    id = auth.uid()
    or role = 'coach'
    or is_coach()
  );

create policy "profiles_update_own" on profiles
  for update using (id = auth.uid());

create policy "profiles_insert_own" on profiles
  for insert with check (id = auth.uid());

-- programs ----------------------------------------------------------------

create table programs (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references profiles (id) on delete cascade,
  title text not null,
  description text,
  created_at timestamptz not null default now()
);

-- program_assignments -------------------------------------------------------

create table program_assignments (
  program_id uuid not null references programs (id) on delete cascade,
  client_id uuid not null references profiles (id) on delete cascade,
  assigned_at timestamptz not null default now(),
  primary key (program_id, client_id)
);

alter table programs enable row level security;

create policy "programs_coach_manage" on programs
  for all using (is_coach()) with check (is_coach());

create policy "programs_client_select_assigned" on programs
  for select using (
    exists (
      select 1 from program_assignments pa
      where pa.program_id = programs.id and pa.client_id = auth.uid()
    )
  );

alter table program_assignments enable row level security;

create policy "assignments_coach_manage" on program_assignments
  for all using (is_coach()) with check (is_coach());

create policy "assignments_client_select_own" on program_assignments
  for select using (client_id = auth.uid());

-- workouts -----------------------------------------------------------------

create table workouts (
  id uuid primary key default gen_random_uuid(),
  program_id uuid not null references programs (id) on delete cascade,
  name text not null,
  sort_order int not null default 0,
  notes text
);

alter table workouts enable row level security;

create policy "workouts_coach_manage" on workouts
  for all using (is_coach()) with check (is_coach());

create policy "workouts_client_select_assigned" on workouts
  for select using (
    exists (
      select 1 from program_assignments pa
      where pa.program_id = workouts.program_id and pa.client_id = auth.uid()
    )
  );

-- exercises ------------------------------------------------------------------

create table exercises (
  id uuid primary key default gen_random_uuid(),
  workout_id uuid not null references workouts (id) on delete cascade,
  name text not null,
  sets int,
  reps int,
  weight_target text,
  notes text
);

alter table exercises enable row level security;

create policy "exercises_coach_manage" on exercises
  for all using (is_coach()) with check (is_coach());

create policy "exercises_client_select_assigned" on exercises
  for select using (
    exists (
      select 1 from workouts w
      join program_assignments pa on pa.program_id = w.program_id
      where w.id = exercises.workout_id and pa.client_id = auth.uid()
    )
  );

-- progress_logs ----------------------------------------------------------------

create table progress_logs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles (id) on delete cascade,
  log_date date not null default current_date,
  weight numeric,
  measurements jsonb,
  notes text,
  created_at timestamptz not null default now()
);

alter table progress_logs enable row level security;

create policy "progress_logs_owner_manage" on progress_logs
  for all using (client_id = auth.uid()) with check (client_id = auth.uid());

create policy "progress_logs_coach_select" on progress_logs
  for select using (is_coach());

-- progress_photos ---------------------------------------------------------------

create table progress_photos (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles (id) on delete cascade,
  storage_path text not null,
  log_date date not null default current_date,
  created_at timestamptz not null default now()
);

alter table progress_photos enable row level security;

create policy "progress_photos_owner_manage" on progress_photos
  for all using (client_id = auth.uid()) with check (client_id = auth.uid());

create policy "progress_photos_coach_select" on progress_photos
  for select using (is_coach());

-- messages ------------------------------------------------------------------------

create table messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references profiles (id) on delete cascade,
  recipient_id uuid not null references profiles (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

alter table messages enable row level security;

create policy "messages_select_participant" on messages
  for select using (sender_id = auth.uid() or recipient_id = auth.uid());

create policy "messages_insert_participant" on messages
  for insert with check (sender_id = auth.uid());

create policy "messages_update_recipient_read" on messages
  for update using (recipient_id = auth.uid());

-- sessions (bookings) -----------------------------------------------------------------

create table sessions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles (id) on delete cascade,
  coach_id uuid not null references profiles (id) on delete cascade,
  scheduled_at timestamptz not null,
  status session_status not null default 'requested',
  notes text,
  created_at timestamptz not null default now()
);

alter table sessions enable row level security;

create policy "sessions_client_manage_own" on sessions
  for all using (client_id = auth.uid()) with check (client_id = auth.uid());

create policy "sessions_coach_manage" on sessions
  for all using (is_coach()) with check (is_coach());

-- subscriptions -----------------------------------------------------------------------

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null unique references profiles (id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  tier subscription_tier not null default 'none',
  status subscription_status not null default 'inactive',
  updated_at timestamptz not null default now()
);

alter table subscriptions enable row level security;

create policy "subscriptions_select_own_or_coach" on subscriptions
  for select using (client_id = auth.uid() or is_coach());

-- writes to subscriptions happen only via the service-role key from the
-- Stripe webhook handler, so no insert/update policy is granted to regular users.

-- storage: progress photos bucket -------------------------------------------------------

insert into storage.buckets (id, name, public) values ('progress-photos', 'progress-photos', false)
  on conflict (id) do nothing;

create policy "progress_photos_storage_owner" on storage.objects
  for all using (
    bucket_id = 'progress-photos'
    and (auth.uid() = owner or is_coach())
  ) with check (
    bucket_id = 'progress-photos' and auth.uid() = owner
  );
