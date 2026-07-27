-- Youngtimer Garage
-- Migration 0001 — Fondation (Phase 0)
--
-- Portée volontairement minimale : uniquement ce qui est nécessaire pour
-- que l'authentification fonctionne (table profiles + RLS).
-- Aucune table métier (catalogue, garage, véhicules, annonces, etc.) —
-- celles-ci arriveront en Phase 1/2/3, une fois les points de vigilance
-- identifiés dans la revue du schéma initial tranchés explicitement.

create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  avatar_path text,
  bio text,
  role text not null default 'user'
    check (role in ('user','editor','moderator','admin')),
  country_code text default 'FR',
  region_code text,
  region_name text,
  department_code text,
  department_name text,
  city text,
  postal_code text,
  location_precision text not null default 'department'
    check (location_precision in ('country','region','department','city','approximate')),
  latitude double precision,
  longitude double precision,
  public_location_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- TRIGGER updated_at
-- =========================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- =========================================================
-- CRÉATION AUTOMATIQUE DU PROFIL À L'INSCRIPTION
-- =========================================================
-- Sans ce trigger, un utilisateur peut s'inscrire via Supabase Auth sans
-- jamais obtenir de ligne dans public.profiles (la policy d'insertion
-- ci-dessous dépend d'un appel applicatif qui pourrait échouer/être oublié).
-- SECURITY DEFINER : nécessaire pour écrire dans public.profiles au nom
-- d'un utilisateur qui n'a pas encore de session RLS active à cet instant.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================
-- RLS
-- =========================================================

alter table public.profiles enable row level security;

create policy "users read own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "users update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "users insert own profile"
on public.profiles for insert
with check (auth.uid() = id);

-- NOTE :
-- Aucune policy de lecture publique n'est ajoutée ici. Le pack prévoit
-- qu'une vue dédiée aux champs de profil publics soit créée plus tard
-- (00_MASTER_SPEC.md, section RLS profiles) — décision à prendre
-- explicitement en Phase 1/2, pas dans cette migration de fondation.
