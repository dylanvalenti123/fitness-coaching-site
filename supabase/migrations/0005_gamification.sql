-- Streak tracking + milestone badges for the core plan's progress logging.

alter table profiles
  add column current_streak int not null default 0,
  add column longest_streak int not null default 0,
  add column last_log_date date;

create table badges (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles (id) on delete cascade,
  badge_key text not null,
  earned_at timestamptz not null default now(),
  unique (client_id, badge_key)
);

alter table badges enable row level security;

create policy "badges_select_own_or_coach" on badges
  for select using (client_id = auth.uid() or is_coach());

create policy "badges_insert_own" on badges
  for insert with check (client_id = auth.uid());
