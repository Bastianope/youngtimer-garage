-- Annonces de pièces « Je cherche / Je vends », rattachées à un modèle du catalogue.
-- Lecture publique des annonces actives ; le contact n'est lisible que par les membres connectés.
-- Relançable sans risque.

create table if not exists public.part_listings (
  id uuid primary key default gen_random_uuid(),
  car_model_id uuid not null references public.car_models(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('wanted', 'for_sale')),
  title text not null check (char_length(title) between 3 and 120),
  description text check (char_length(description) <= 2000),
  price_amount numeric(10,2) check (price_amount is null or (price_amount >= 0 and price_amount <= 100000)),
  location text check (char_length(location) <= 80),
  contact text not null check (char_length(contact) between 3 and 200),
  status text not null default 'active' check (status in ('active', 'closed')),
  expires_at timestamptz not null default (now() + interval '90 days'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists part_listings_model_idx on public.part_listings (car_model_id, status, expires_at);
create index if not exists part_listings_user_idx on public.part_listings (user_id, created_at);

drop trigger if exists part_listings_set_updated_at on public.part_listings;
create trigger part_listings_set_updated_at
before update on public.part_listings
for each row execute function public.set_updated_at();

-- Anti-spam côté base : 10 annonces maximum par membre et par 24 heures
create or replace function public.part_listings_limit_per_day()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if (
    select count(*) from public.part_listings
    where user_id = new.user_id
      and created_at > now() - interval '24 hours'
  ) >= 10 then
    raise exception 'Limite de 10 annonces par 24 heures atteinte';
  end if;
  return new;
end;
$$;

drop trigger if exists part_listings_limit_per_day on public.part_listings;
create trigger part_listings_limit_per_day
before insert on public.part_listings
for each row execute function public.part_listings_limit_per_day();

alter table public.part_listings enable row level security;

drop policy if exists part_listings_select_public on public.part_listings;
create policy part_listings_select_public
on public.part_listings for select
using (status = 'active' and expires_at > now());

drop policy if exists part_listings_select_owner on public.part_listings;
create policy part_listings_select_owner
on public.part_listings for select to authenticated
using (auth.uid() = user_id);

drop policy if exists part_listings_select_admin on public.part_listings;
create policy part_listings_select_admin
on public.part_listings for select to authenticated
using (public.is_admin_or_editor());

drop policy if exists part_listings_insert_owner on public.part_listings;
create policy part_listings_insert_owner
on public.part_listings for insert to authenticated
with check (
  auth.uid() = user_id
  and status = 'active'
  and expires_at <= now() + interval '91 days'
);

drop policy if exists part_listings_update_owner on public.part_listings;
create policy part_listings_update_owner
on public.part_listings for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id and expires_at <= now() + interval '91 days');

drop policy if exists part_listings_delete_owner_or_admin on public.part_listings;
create policy part_listings_delete_owner_or_admin
on public.part_listings for delete to authenticated
using (auth.uid() = user_id or public.is_admin_or_editor());

-- Droits par colonne : les visiteurs non connectés ne voient ni le contact ni l'auteur,
-- et personne ne peut antidater une annonce ni la faire « remonter » en changeant sa date
revoke all on public.part_listings from anon, authenticated;
grant select (id, car_model_id, kind, title, description, price_amount, location, status, expires_at, created_at)
  on public.part_listings to anon;
grant select, delete on public.part_listings to authenticated;
grant insert (car_model_id, user_id, kind, title, description, price_amount, location, contact, expires_at)
  on public.part_listings to authenticated;
grant update (kind, title, description, price_amount, location, contact, status, expires_at)
  on public.part_listings to authenticated;

-- Recharge le cache de l'API Supabase pour qu'elle voie la nouvelle table tout de suite
notify pgrst, 'reload schema';
