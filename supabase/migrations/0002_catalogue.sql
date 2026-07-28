-- Youngtimer Garage
-- Migration 0002 — Catalogue automobile (Phase 1)
--
-- Portée : rôle admin/editor (D.7, ADR 0002), hiérarchie marques/modèles/
-- générations/versions, RLS publiée/brouillon, recherche par trigramme.
-- Aucune donnée technique automobile n'est inventée : les champs de
-- caractéristiques restent nullables et marqués unverified par défaut
-- (06_CONTENT_AND_DATA_POLICY.md, règle 1).

create extension if not exists pg_trgm;
create extension if not exists unaccent;

-- =========================================================
-- RÔLE ADMIN/EDITOR (D.7 — ADR 0002)
-- =========================================================
-- SECURITY DEFINER + search_path fixé : évite toute récursion RLS quand
-- cette fonction est utilisée dans les policies de public.profiles ou
-- d'autres tables. `stable` : le résultat ne change pas dans une même
-- transaction, permet à Postgres de l'optimiser dans les plans de requête.

create or replace function public.is_admin_or_editor()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$;

-- =========================================================
-- CAR_MAKES
-- =========================================================

create table public.car_makes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  country_origin text,
  logo_url text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_car_makes_updated_at
  before update on public.car_makes
  for each row execute function public.set_updated_at();

alter table public.car_makes enable row level security;

create policy "car_makes public read"
on public.car_makes for select
using (true);

create policy "car_makes admin write"
on public.car_makes for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());

-- =========================================================
-- CAR_MODELS
-- =========================================================

create table public.car_models (
  id uuid primary key default gen_random_uuid(),
  make_id uuid not null references public.car_makes(id) on delete restrict,
  name text not null,
  slug text not null,
  description text,
  cover_image_url text,
  source_type text,
  source_name text,
  source_url text,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'verified')),
  verified_at timestamptz,
  reviewed_by uuid references public.profiles(id),
  published_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (make_id, slug)
);

create or replace function public.immutable_unaccent(text)
returns text
language sql
set search_path = public, extensions
immutable
parallel safe
as $$
  select unaccent('unaccent', $1);
$$;

create index car_models_name_trgm
 on public.car_models using gin (public.immutable_unaccent(name) gin_trgm_ops);
create trigger set_car_models_updated_at
  before update on public.car_models
  for each row execute function public.set_updated_at();

alter table public.car_models enable row level security;

create policy "car_models public read published"
on public.car_models for select
using (published_at is not null or public.is_admin_or_editor());

create policy "car_models admin write"
on public.car_models for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());

-- =========================================================
-- CAR_GENERATIONS
-- =========================================================

create table public.car_generations (
  id uuid primary key default gen_random_uuid(),
  model_id uuid not null references public.car_models(id) on delete restrict,
  name text not null,
  year_start integer,
  year_end integer,
  body_type text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_car_generations_updated_at
  before update on public.car_generations
  for each row execute function public.set_updated_at();

alter table public.car_generations enable row level security;

-- Visible si le modèle parent est publié (ou si admin/editor) : la
-- publication se pilote au niveau du modèle, pas de chaque génération.
create policy "car_generations public read via published model"
on public.car_generations for select
using (
  public.is_admin_or_editor()
  or exists (
    select 1 from public.car_models m
    where m.id = car_generations.model_id and m.published_at is not null
  )
);

create policy "car_generations admin write"
on public.car_generations for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());

-- =========================================================
-- CAR_VERSIONS
-- =========================================================

create table public.car_versions (
  id uuid primary key default gen_random_uuid(),
  generation_id uuid not null references public.car_generations(id) on delete restrict,
  name text not null,
  engine_description text,
  source_type text,
  source_name text,
  source_url text,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'verified')),
  verified_at timestamptz,
  reviewed_by uuid references public.profiles(id),
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_car_versions_updated_at
  before update on public.car_versions
  for each row execute function public.set_updated_at();

alter table public.car_versions enable row level security;

create policy "car_versions public read via published model"
on public.car_versions for select
using (
  public.is_admin_or_editor()
  or exists (
    select 1
    from public.car_generations g
    join public.car_models m on m.id = g.model_id
    where g.id = car_versions.generation_id and m.published_at is not null
  )
);

create policy "car_versions admin write"
on public.car_versions for all
using (public.is_admin_or_editor())
with check (public.is_admin_or_editor());
