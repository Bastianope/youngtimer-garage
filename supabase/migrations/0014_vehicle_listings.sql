-- Annonces de vente de véhicules, créées depuis la fiche d'un véhicule de Mon Garage.
-- L'annonce n'est visible que si le véhicule est public ; le contact n'est lisible que par les membres connectés.
-- Relançable sans risque.

create table if not exists public.vehicle_listings (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  price_amount numeric(12,2) not null check (price_amount >= 0 and price_amount <= 10000000),
  mileage_km integer check (mileage_km is null or (mileage_km >= 0 and mileage_km <= 3000000)),
  location text check (char_length(location) <= 80),
  country text not null default 'France' check (country in ('France', 'Belgique', 'Suisse', 'Luxembourg')),
  contact text not null check (char_length(contact) between 3 and 200),
  description text check (char_length(description) <= 4000),
  status text not null default 'active' check (status in ('active', 'sold', 'closed')),
  expires_at timestamptz not null default (now() + interval '90 days'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Une seule annonce active par véhicule
create unique index if not exists vehicle_listings_one_active_idx
  on public.vehicle_listings (vehicle_id) where status = 'active';
create index if not exists vehicle_listings_status_idx on public.vehicle_listings (status, expires_at, created_at);
create index if not exists vehicle_listings_user_idx on public.vehicle_listings (user_id);

drop trigger if exists vehicle_listings_set_updated_at on public.vehicle_listings;
create trigger vehicle_listings_set_updated_at
before update on public.vehicle_listings
for each row execute function public.set_updated_at();

alter table public.vehicle_listings enable row level security;

drop policy if exists vehicle_listings_select_public on public.vehicle_listings;
create policy vehicle_listings_select_public
on public.vehicle_listings for select
using (
  status = 'active'
  and expires_at > now()
  and exists (
    select 1 from public.vehicles v
    where v.id = vehicle_listings.vehicle_id and v.privacy_level = 'public'
  )
);

drop policy if exists vehicle_listings_select_owner on public.vehicle_listings;
create policy vehicle_listings_select_owner
on public.vehicle_listings for select to authenticated
using (auth.uid() = user_id);

drop policy if exists vehicle_listings_select_admin on public.vehicle_listings;
create policy vehicle_listings_select_admin
on public.vehicle_listings for select to authenticated
using (public.is_admin_or_editor());

-- On ne peut vendre que son propre véhicule
drop policy if exists vehicle_listings_insert_owner on public.vehicle_listings;
create policy vehicle_listings_insert_owner
on public.vehicle_listings for insert to authenticated
with check (
  auth.uid() = user_id
  and status = 'active'
  and expires_at <= now() + interval '91 days'
  and exists (
    select 1 from public.vehicles v
    where v.id = vehicle_listings.vehicle_id and v.current_owner_user_id = auth.uid()
  )
);

drop policy if exists vehicle_listings_update_owner on public.vehicle_listings;
create policy vehicle_listings_update_owner
on public.vehicle_listings for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id and expires_at <= now() + interval '91 days');

drop policy if exists vehicle_listings_delete_owner_or_admin on public.vehicle_listings;
create policy vehicle_listings_delete_owner_or_admin
on public.vehicle_listings for delete to authenticated
using (auth.uid() = user_id or public.is_admin_or_editor());

-- Droits par colonne : les visiteurs ne voient ni le contact ni l'auteur,
-- et personne ne peut antidater une annonce
revoke all on public.vehicle_listings from anon, authenticated;
grant select (id, vehicle_id, price_amount, mileage_km, location, country, description, status, expires_at, created_at)
  on public.vehicle_listings to anon;
grant select, delete on public.vehicle_listings to authenticated;
grant insert (vehicle_id, user_id, price_amount, mileage_km, location, country, contact, description, expires_at)
  on public.vehicle_listings to authenticated;
grant update (price_amount, mileage_km, location, country, contact, description, status, expires_at)
  on public.vehicle_listings to authenticated;

notify pgrst, 'reload schema';
