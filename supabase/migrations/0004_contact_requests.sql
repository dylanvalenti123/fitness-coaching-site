create table contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_requests enable row level security;

-- Public marketing form: anyone can submit, only the coach can read.
create policy "contact_requests_public_insert" on contact_requests
  for insert with check (true);

create policy "contact_requests_coach_select" on contact_requests
  for select using (is_coach());
