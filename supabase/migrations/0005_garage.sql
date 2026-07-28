-- Youngtimer Garage
-- Migration 0005 — Mon Garage (Phase 2)
--
-- Portée : préférences de localisation sur profiles (prévues en Phase 0
-- mais jamais appliquées en pratique — vérifié le 28/07/2026), garage_items
-- (modèles rêvés/recherchés/possédés), model_follows (suivi de modèle
-- basique). RLS + GRANT appliqués dans la même migration que la création
-- des tables (leçon de la migration 0004, Phase 1).
--
-- garage_items.vehicle_id est un uuid nullable SANS contrainte de clé
-- étrangère pour l'instant : public.vehicles n'existe pas encore
-- (Phase 3). La FK sera ajoutée dans la migration de la Phase 3.

-- =========================================================
-- PROFILES — préférences de localisation
-- =========================================================

alter table public.profiles
  add column if not exists region_code text,
  add column if not exists region_name text,
  add column if not exists department_code text,
  add column if not exists department_name text,
  add column if not exists city text,
  add column if not exists postal_code text,
  add column if not exists location_precision text not null default 'department',
  add column if not exists public_location_enabled boolean not null default true;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'profiles_location_precision_check'
  ) then
    alter table public.profiles
      add constraint profiles_location_precision_check
      check (location_precision in ('country','region','department','city','approximate'));
  end if;
end $$;

-- =========================================================
-- GARAGE_ITEMS
-- =========================================================

create table public.garage_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  model_id uuid not null references public.car_models(id) on delete cascade,
  vehicle_id uuid,
  status text not null
    check (status in ('dream','searching','owned','archived')),
  title_override text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index garage_items_user_idx on public.garage_items(user_id);
create index garage_items_model_idx on public.garage_items(model_id);
create index garage_items_status_idx on public.garage_items(user_id, status);

create trigger set_garage_items_updated_at
  before update on public.garage_items
  for each row execute function public.set_updated_at();

alter table public.garage_items enable row level security;

create policy "garage_items read own"
on public.garage_items for select
using (auth.uid() = user_id);

create policy "garage_items insert own"
on public.garage_items for insert
with check (auth.uid() = user_id);

create policy "garage_items update own"
on public.garage_items for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "garage_items delete own"
on public.garage_items for delete
using (auth.uid() = user_id);

-- =========================================================
-- MODEL_FOLLOWS
-- =========================================================

create table public.model_follows (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  model_id uuid not null references public.car_models(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, model_id)
);

create index model_follows_user_idx on public.model_follows(user_id);
create index model_follows_model_idx on public.model_follows(model_id);

alter table public.model_follows enable row level security;

create policy "model_follows manage own"
on public.model_follows for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- =========================================================
-- GRANT (leçon de la Phase 1 — appliqué dès cette migration)
-- =========================================================

grant select, insert, update, delete on public.garage_items to authenticated;
grant select, insert, update, delete on public.model_follows to authenticated;
