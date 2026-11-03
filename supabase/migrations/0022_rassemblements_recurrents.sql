-- Rassemblements récurrents : une page fixe par série (/explorer/rassemblements/<slug>).
-- Corrige aussi les droits de la clé service, absents sur events : le cron mensuel
-- n'arrivait ni à lire ni à insérer les rendez-vous (seuls ceux saisis à la main existaient).
-- Relançable sans risque. À lancer dans le SQL Editor Supabase AVANT de merger la PR.

grant select, insert on public.events to service_role;

alter table public.events add column if not exists series_slug text;
alter table public.events drop constraint if exists events_series_slug_check;
alter table public.events add constraint events_series_slug_check
  check (series_slug is null or series_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$');
create index if not exists events_series_slug_idx on public.events (series_slug, start_date);

-- Occurrences déjà en base
update public.events set series_slug = 'vincennes-en-anciennes'
where title = 'Vincennes en Anciennes' and series_slug is null;
update public.events set series_slug = 'cars-and-coffee-vitrolles'
where title = 'Cars & Coffee Vitrolles' and series_slug is null;

notify pgrst, 'reload schema';

-- Contrôle : nombre d'occurrences rattachées par série
select series_slug, count(*) as occurrences, min(start_date) as premiere, max(start_date) as derniere
from public.events where series_slug is not null group by series_slug order by series_slug;
