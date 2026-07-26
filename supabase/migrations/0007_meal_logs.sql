-- AI calorie tracker: photo-based meal logging.

create table meal_logs (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references profiles (id) on delete cascade,
  storage_path text not null,
  description text,
  calories int,
  protein_g int,
  carbs_g int,
  fat_g int,
  created_at timestamptz not null default now()
);

alter table meal_logs enable row level security;

create policy "meal_logs_owner_manage" on meal_logs
  for all using (client_id = auth.uid()) with check (client_id = auth.uid());

create policy "meal_logs_coach_select" on meal_logs
  for select using (is_coach());

insert into storage.buckets (id, name, public) values ('meal-photos', 'meal-photos', false)
  on conflict (id) do nothing;

create policy "meal_photos_storage_owner" on storage.objects
  for all using (
    bucket_id = 'meal-photos'
    and (auth.uid() = owner or is_coach())
  ) with check (
    bucket_id = 'meal-photos' and auth.uid() = owner
  );
