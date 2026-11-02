-- Kilométrage estimé : moyenne annuelle déclarée et date du dernier relevé de la fiche véhicule.
-- Relançable sans risque. À lancer dans le SQL Editor Supabase AVANT de merger la PR.

alter table public.vehicles add column if not exists annual_mileage_km integer;
alter table public.vehicles drop constraint if exists vehicles_annual_mileage_km_check;
alter table public.vehicles add constraint vehicles_annual_mileage_km_check
  check (annual_mileage_km is null or (annual_mileage_km > 0 and annual_mileage_km <= 200000));

alter table public.vehicles add column if not exists mileage_recorded_at date;

-- Relevés existants : date de dernière modification de la fiche, à défaut
update public.vehicles
set mileage_recorded_at = updated_at::date
where mileage_km is not null and mileage_recorded_at is null;

notify pgrst, 'reload schema';

-- Contrôle : 2 colonnes attendues
select count(*) as nouvelles_colonnes
from information_schema.columns
where table_schema = 'public' and table_name = 'vehicles'
  and column_name in ('annual_mileage_km', 'mileage_recorded_at');
