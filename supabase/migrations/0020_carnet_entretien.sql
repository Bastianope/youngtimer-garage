-- Carnet d'entretien : check-list de ce qui est remplacé, intervalles par véhicule,
-- échéances (CT, garantie, assurance), factures rattachées aux entretiens,
-- type de véhicule (voiture / utilitaire).
-- Relançable sans risque. À lancer dans le SQL Editor Supabase AVANT de merger la PR.

-- ============================================================
-- 1. Référentiel des éléments d'entretien (lecture publique)
--    Intervalles = valeurs INDICATIVES génériques, ajustables par véhicule.
-- ============================================================
create table if not exists public.maintenance_item_types (
  code text primary key,
  label text not null,
  category text not null check (category in ('moteur', 'filtres', 'liquides', 'distribution', 'freinage', 'liaison_sol', 'electricite', 'divers')),
  default_interval_km integer check (default_interval_km is null or default_interval_km > 0),
  default_interval_months integer check (default_interval_months is null or default_interval_months > 0),
  sort_order integer not null default 0
);

alter table public.maintenance_item_types enable row level security;
drop policy if exists maintenance_item_types_select_all on public.maintenance_item_types;
create policy maintenance_item_types_select_all on public.maintenance_item_types for select using (true);
grant select on public.maintenance_item_types to anon, authenticated;

insert into public.maintenance_item_types (code, label, category, default_interval_km, default_interval_months, sort_order) values
  ('huile_moteur',            'Huile moteur',                    'moteur',       15000, 12,  10),
  ('filtre_huile',            'Filtre à huile',                  'filtres',      15000, 12,  20),
  ('filtre_air',              'Filtre à air',                    'filtres',      30000, 24,  30),
  ('filtre_habitacle',        'Filtre d''habitacle',             'filtres',      15000, 12,  40),
  ('filtre_carburant',        'Filtre à carburant',              'filtres',      60000, 48,  50),
  ('bougies',                 'Bougies d''allumage',             'moteur',       60000, 48,  60),
  ('liquide_frein',           'Liquide de frein',                'liquides',     null,  24,  70),
  ('liquide_refroidissement', 'Liquide de refroidissement',      'liquides',     null,  48,  80),
  ('huile_boite',             'Huile de boîte de vitesses',      'liquides',     null,  null, 90),
  ('huile_pont',              'Huile de pont / différentiel',    'liquides',     null,  null, 100),
  ('liquide_direction',       'Liquide de direction assistée',   'liquides',     null,  null, 110),
  ('kit_distribution',        'Kit de distribution',             'distribution', 120000, 60, 120),
  ('pompe_eau',               'Pompe à eau',                     'distribution', null,  null, 130),
  ('courroie_accessoires',    'Courroie d''accessoires',         'distribution', 120000, 60, 140),
  ('plaquettes_av',           'Plaquettes de frein avant',       'freinage',     null,  null, 150),
  ('disques_av',              'Disques de frein avant',          'freinage',     null,  null, 160),
  ('plaquettes_ar',           'Plaquettes / mâchoires arrière',  'freinage',     null,  null, 170),
  ('disques_ar',              'Disques / tambours arrière',      'freinage',     null,  null, 180),
  ('pneus_av',                'Pneus avant',                     'liaison_sol',  null,  null, 190),
  ('pneus_ar',                'Pneus arrière',                   'liaison_sol',  null,  null, 200),
  ('amortisseurs',            'Amortisseurs',                    'liaison_sol',  null,  null, 210),
  ('geometrie',               'Géométrie / parallélisme',        'liaison_sol',  null,  null, 220),
  ('batterie',                'Batterie',                        'electricite',  null,  null, 230),
  ('balais_essuie_glace',     'Balais d''essuie-glace',          'divers',       null,  12,  240),
  ('recharge_clim',           'Recharge de climatisation',       'divers',       null,  null, 250)
on conflict (code) do nothing;

-- ============================================================
-- 2. Lignes d'entretien : ce qui a été remplacé lors d'un entretien
--    Droits hérités de l'entretien parent (et donc du véhicule).
-- ============================================================
create table if not exists public.maintenance_record_items (
  id uuid primary key default gen_random_uuid(),
  maintenance_record_id uuid not null references public.maintenance_records(id) on delete cascade,
  item_type_code text not null references public.maintenance_item_types(code),
  part_brand text,
  part_reference text,
  notes text,
  created_at timestamptz not null default now(),
  unique (maintenance_record_id, item_type_code)
);
create index if not exists maintenance_record_items_record_idx on public.maintenance_record_items (maintenance_record_id);

alter table public.maintenance_record_items enable row level security;

drop policy if exists maintenance_record_items_select_public on public.maintenance_record_items;
create policy maintenance_record_items_select_public on public.maintenance_record_items for select
using (exists (
  select 1 from public.maintenance_records m
  join public.vehicles v on v.id = m.vehicle_id
  where m.id = maintenance_record_items.maintenance_record_id
    and m.is_public = true and v.privacy_level = 'public'
));

drop policy if exists maintenance_record_items_owner_all on public.maintenance_record_items;
create policy maintenance_record_items_owner_all on public.maintenance_record_items for all
using (exists (
  select 1 from public.maintenance_records m
  join public.vehicles v on v.id = m.vehicle_id
  where m.id = maintenance_record_items.maintenance_record_id
    and v.current_owner_user_id = auth.uid()
))
with check (exists (
  select 1 from public.maintenance_records m
  join public.vehicles v on v.id = m.vehicle_id
  where m.id = maintenance_record_items.maintenance_record_id
    and v.current_owner_user_id = auth.uid()
));

grant select, insert, update, delete on public.maintenance_record_items to authenticated;
grant select on public.maintenance_record_items to anon;

-- ============================================================
-- 3. Intervalles personnalisés par véhicule (propriétaire uniquement)
-- ============================================================
create table if not exists public.vehicle_maintenance_intervals (
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  item_type_code text not null references public.maintenance_item_types(code),
  interval_km integer check (interval_km is null or interval_km > 0),
  interval_months integer check (interval_months is null or interval_months > 0),
  primary key (vehicle_id, item_type_code)
);

alter table public.vehicle_maintenance_intervals enable row level security;
drop policy if exists vehicle_maintenance_intervals_owner_all on public.vehicle_maintenance_intervals;
create policy vehicle_maintenance_intervals_owner_all on public.vehicle_maintenance_intervals for all
using (exists (select 1 from public.vehicles v where v.id = vehicle_maintenance_intervals.vehicle_id and v.current_owner_user_id = auth.uid()))
with check (exists (select 1 from public.vehicles v where v.id = vehicle_maintenance_intervals.vehicle_id and v.current_owner_user_id = auth.uid()));
grant select, insert, update, delete on public.vehicle_maintenance_intervals to authenticated;

-- ============================================================
-- 4. Échéances du véhicule (propriétaire uniquement, jamais public)
--    Table séparée : la table vehicles est lisible par anon pour les fiches publiques.
-- ============================================================
create table if not exists public.vehicle_reminders (
  vehicle_id uuid primary key references public.vehicles(id) on delete cascade,
  ct_due_date date,
  warranty_end_date date,
  warranty_end_mileage_km integer,
  insurance_renewal_date date,
  updated_at timestamptz not null default now()
);

drop trigger if exists vehicle_reminders_set_updated_at on public.vehicle_reminders;
create trigger vehicle_reminders_set_updated_at
before update on public.vehicle_reminders
for each row execute function public.set_updated_at();

alter table public.vehicle_reminders enable row level security;
drop policy if exists vehicle_reminders_owner_all on public.vehicle_reminders;
create policy vehicle_reminders_owner_all on public.vehicle_reminders for all
using (exists (select 1 from public.vehicles v where v.id = vehicle_reminders.vehicle_id and v.current_owner_user_id = auth.uid()))
with check (exists (select 1 from public.vehicles v where v.id = vehicle_reminders.vehicle_id and v.current_owner_user_id = auth.uid()));
grant select, insert, update, delete on public.vehicle_reminders to authenticated;

-- ============================================================
-- 5. Factures et documents rattachés à un entretien
-- ============================================================
alter table public.vehicle_documents
  add column if not exists maintenance_record_id uuid references public.maintenance_records(id) on delete set null;
create index if not exists vehicle_documents_record_idx on public.vehicle_documents (maintenance_record_id);

-- Bucket privé : 15 Mo max, photos et PDF uniquement
update storage.buckets
set file_size_limit = 15728640,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif', 'application/pdf']
where id = 'vehicle-documents';

-- ============================================================
-- 6. Type de véhicule (voiture / utilitaire léger)
-- ============================================================
alter table public.vehicles add column if not exists vehicle_type text not null default 'car';
alter table public.vehicles drop constraint if exists vehicles_vehicle_type_check;
alter table public.vehicles add constraint vehicles_vehicle_type_check check (vehicle_type in ('car', 'van'));

notify pgrst, 'reload schema';

-- Contrôle
select
  (select count(*) from public.maintenance_item_types) as elements_referentiel,
  (select count(*) from information_schema.tables where table_schema = 'public'
     and table_name in ('maintenance_record_items', 'vehicle_maintenance_intervals', 'vehicle_reminders')) as nouvelles_tables,
  (select count(*) from information_schema.columns where table_schema = 'public'
     and table_name = 'vehicle_documents' and column_name = 'maintenance_record_id') as colonne_facture,
  (select count(*) from information_schema.columns where table_schema = 'public'
     and table_name = 'vehicles' and column_name = 'vehicle_type') as colonne_type;
