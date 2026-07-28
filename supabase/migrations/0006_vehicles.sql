-- ============================================================
-- Phase 3 : Vehicles + historique
-- ============================================================

-- Fonction générique updated_at (CREATE OR REPLACE : réutilise la fonction
-- existante si elle porte déjà ce nom, sinon la crée sans rien casser)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- 1. vehicles
-- ============================================================
create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  generation_id uuid not null references public.car_generations(id) on delete restrict,
  version_id uuid references public.car_versions(id) on delete set null,
  current_owner_user_id uuid references auth.users(id) on delete set null,
  vin text,
  chassis_number text,
  model_year integer,
  mileage_km integer,
  region_code text,
  region_name text,
  department_code text,
  department_name text,
  city text,
  postal_code text,
  location_precision text,
  latitude double precision,
  longitude double precision,
  privacy_level text not null default 'private' check (privacy_level in ('private', 'unlisted', 'public')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index vehicles_generation_id_idx on public.vehicles (generation_id);
create index vehicles_version_id_idx on public.vehicles (version_id);
create index vehicles_current_owner_user_id_idx on public.vehicles (current_owner_user_id);
create index vehicles_privacy_level_idx on public.vehicles (privacy_level) where privacy_level = 'public';

create trigger vehicles_set_updated_at
before update on public.vehicles
for each row execute function public.set_updated_at();

alter table public.vehicles enable row level security;

create policy vehicles_select_public
on public.vehicles for select
using (privacy_level = 'public');

create policy vehicles_select_owner
on public.vehicles for select
using (auth.uid() = current_owner_user_id);

create policy vehicles_insert_owner
on public.vehicles for insert
with check (auth.uid() = current_owner_user_id);

create policy vehicles_update_owner
on public.vehicles for update
using (auth.uid() = current_owner_user_id)
with check (auth.uid() = current_owner_user_id);

create policy vehicles_delete_owner
on public.vehicles for delete
using (auth.uid() = current_owner_user_id);

grant select on public.vehicles to anon, authenticated;
grant insert, update, delete on public.vehicles to authenticated;

-- ============================================================
-- 2. vehicle_ownerships (D.4 + D.5)
-- ============================================================
create table public.vehicle_ownerships (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  owner_label text,
  started_at date,
  ended_at date,
  is_current boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint vehicle_ownerships_current_requires_user
    check (not is_current or user_id is not null)
);

-- D.4 : un seul propriétaire courant par véhicule, garanti au niveau base
create unique index vehicle_ownerships_one_current_idx
on public.vehicle_ownerships (vehicle_id)
where is_current = true;

create index vehicle_ownerships_vehicle_id_idx on public.vehicle_ownerships (vehicle_id);

create trigger vehicle_ownerships_set_updated_at
before update on public.vehicle_ownerships
for each row execute function public.set_updated_at();

-- D.5 : vehicles.current_owner_user_id = cache alimenté exclusivement par ce trigger
create or replace function public.sync_vehicle_current_owner()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_vehicle_id uuid;
  new_owner uuid;
begin
  target_vehicle_id := coalesce(new.vehicle_id, old.vehicle_id);

  select user_id into new_owner
  from public.vehicle_ownerships
  where vehicle_id = target_vehicle_id
    and is_current = true
  limit 1;

  update public.vehicles
  set current_owner_user_id = new_owner
  where id = target_vehicle_id;

  return coalesce(new, old);
end;
$$;

create trigger vehicle_ownerships_sync_owner
after insert or update or delete on public.vehicle_ownerships
for each row execute function public.sync_vehicle_current_owner();

alter table public.vehicle_ownerships enable row level security;

create policy vehicle_ownerships_select_owner
on public.vehicle_ownerships for select
using (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_ownerships.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_ownerships_insert_owner
on public.vehicle_ownerships for insert
with check (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_ownerships.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_ownerships_update_owner
on public.vehicle_ownerships for update
using (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_ownerships.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_ownerships.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_ownerships_delete_owner
on public.vehicle_ownerships for delete
using (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_ownerships.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

grant select, insert, update, delete on public.vehicle_ownerships to authenticated;

-- ============================================================
-- 3. vehicle_events (D.1)
-- ============================================================
create table public.vehicle_events (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  event_type text not null default 'note',
  event_date date,
  title text not null,
  description text,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index vehicle_events_vehicle_id_idx on public.vehicle_events (vehicle_id);

create trigger vehicle_events_set_updated_at
before update on public.vehicle_events
for each row execute function public.set_updated_at();

alter table public.vehicle_events enable row level security;

create policy vehicle_events_select_public
on public.vehicle_events for select
using (
  is_public = true
  and exists (
    select 1 from public.vehicles v
    where v.id = vehicle_events.vehicle_id
      and v.privacy_level = 'public'
  )
);

create policy vehicle_events_select_owner
on public.vehicle_events for select
using (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_events.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_events_insert_owner
on public.vehicle_events for insert
with check (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_events.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_events_update_owner
on public.vehicle_events for update
using (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_events.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_events.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_events_delete_owner
on public.vehicle_events for delete
using (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_events.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

grant select, insert, update, delete on public.vehicle_events to authenticated;
grant select on public.vehicle_events to anon;

-- ============================================================
-- 4. maintenance_records (D.1)
-- ============================================================
create table public.maintenance_records (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  performed_at date,
  mileage_km integer,
  category text not null default 'other',
  description text,
  cost_amount numeric(10,2),
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index maintenance_records_vehicle_id_idx on public.maintenance_records (vehicle_id);

create trigger maintenance_records_set_updated_at
before update on public.maintenance_records
for each row execute function public.set_updated_at();

alter table public.maintenance_records enable row level security;

create policy maintenance_records_select_public
on public.maintenance_records for select
using (
  is_public = true
  and exists (
    select 1 from public.vehicles v
    where v.id = maintenance_records.vehicle_id
      and v.privacy_level = 'public'
  )
);

create policy maintenance_records_select_owner
on public.maintenance_records for select
using (
  exists (
    select 1 from public.vehicles v
    where v.id = maintenance_records.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

create policy maintenance_records_insert_owner
on public.maintenance_records for insert
with check (
  exists (
    select 1 from public.vehicles v
    where v.id = maintenance_records.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

create policy maintenance_records_update_owner
on public.maintenance_records for update
using (
  exists (
    select 1 from public.vehicles v
    where v.id = maintenance_records.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.vehicles v
    where v.id = maintenance_records.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

create policy maintenance_records_delete_owner
on public.maintenance_records for delete
using (
  exists (
    select 1 from public.vehicles v
    where v.id = maintenance_records.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

grant select, insert, update, delete on public.maintenance_records to authenticated;
grant select on public.maintenance_records to anon;

-- ============================================================
-- 5. vehicle_media (D.1)
-- ============================================================
create table public.vehicle_media (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  storage_path text not null,
  caption text,
  position integer not null default 0,
  is_public boolean not null default false,
  created_at timestamptz not null default now()
);

create index vehicle_media_vehicle_id_idx on public.vehicle_media (vehicle_id);

alter table public.vehicle_media enable row level security;

create policy vehicle_media_select_public
on public.vehicle_media for select
using (
  is_public = true
  and exists (
    select 1 from public.vehicles v
    where v.id = vehicle_media.vehicle_id
      and v.privacy_level = 'public'
  )
);

create policy vehicle_media_select_owner
on public.vehicle_media for select
using (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_media.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_media_insert_owner
on public.vehicle_media for insert
with check (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_media.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_media_update_owner
on public.vehicle_media for update
using (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_media.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_media.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_media_delete_owner
on public.vehicle_media for delete
using (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_media.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

grant select, insert, update, delete on public.vehicle_media to authenticated;
grant select on public.vehicle_media to anon;

-- ============================================================
-- 6. vehicle_documents — jamais public, sans exception
-- ============================================================
create table public.vehicle_documents (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  storage_path text not null,
  doc_type text,
  label text,
  created_at timestamptz not null default now()
);

create index vehicle_documents_vehicle_id_idx on public.vehicle_documents (vehicle_id);

alter table public.vehicle_documents enable row level security;

create policy vehicle_documents_select_owner
on public.vehicle_documents for select
using (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_documents.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_documents_insert_owner
on public.vehicle_documents for insert
with check (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_documents.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_documents_update_owner
on public.vehicle_documents for update
using (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_documents.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_documents.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_documents_delete_owner
on public.vehicle_documents for delete
using (
  exists (
    select 1 from public.vehicles v
    where v.id = vehicle_documents.vehicle_id
      and v.current_owner_user_id = auth.uid()
  )
);

-- aucun grant à anon : jamais public
grant select, insert, update, delete on public.vehicle_documents to authenticated;

-- ============================================================
-- 7. Storage : buckets et policies
--    - vehicle-media-public  : public en lecture (photos avec is_public=true)
--    - vehicle-media-private : privé, propriétaire uniquement
--    - vehicle-documents     : privé, propriétaire uniquement, jamais public
--    Convention de chemin : "{vehicle_id}/{fichier}"
-- ============================================================
insert into storage.buckets (id, name, public)
values ('vehicle-media-public', 'vehicle-media-public', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('vehicle-media-private', 'vehicle-media-private', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('vehicle-documents', 'vehicle-documents', false)
on conflict (id) do nothing;

create policy vehicle_media_private_owner_all
on storage.objects for all
using (
  bucket_id = 'vehicle-media-private'
  and exists (
    select 1 from public.vehicles v
    where v.id::text = (storage.foldername(name))[1]
      and v.current_owner_user_id = auth.uid()
  )
)
with check (
  bucket_id = 'vehicle-media-private'
  and exists (
    select 1 from public.vehicles v
    where v.id::text = (storage.foldername(name))[1]
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_media_public_read
on storage.objects for select
using (bucket_id = 'vehicle-media-public');

create policy vehicle_media_public_owner_write
on storage.objects for insert
with check (
  bucket_id = 'vehicle-media-public'
  and exists (
    select 1 from public.vehicles v
    where v.id::text = (storage.foldername(name))[1]
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_media_public_owner_update
on storage.objects for update
using (
  bucket_id = 'vehicle-media-public'
  and exists (
    select 1 from public.vehicles v
    where v.id::text = (storage.foldername(name))[1]
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_media_public_owner_delete
on storage.objects for delete
using (
  bucket_id = 'vehicle-media-public'
  and exists (
    select 1 from public.vehicles v
    where v.id::text = (storage.foldername(name))[1]
      and v.current_owner_user_id = auth.uid()
  )
);

create policy vehicle_documents_bucket_owner_all
on storage.objects for all
using (
  bucket_id = 'vehicle-documents'
  and exists (
    select 1 from public.vehicles v
    where v.id::text = (storage.foldername(name))[1]
      and v.current_owner_user_id = auth.uid()
  )
)
with check (
  bucket_id = 'vehicle-documents'
  and exists (
    select 1 from public.vehicles v
    where v.id::text = (storage.foldername(name))[1]
      and v.current_owner_user_id = auth.uid()
  )
);

-- ============================================================
-- 8. FK manquante depuis la Phase 2
-- ============================================================
alter table public.garage_items
add constraint garage_items_vehicle_id_fkey
foreign key (vehicle_id) references public.vehicles(id) on delete set null;
