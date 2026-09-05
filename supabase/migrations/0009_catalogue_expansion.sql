-- 0009_catalogue_expansion.sql
-- Ajout de marques et modèles youngtimer supplémentaires au catalogue.
-- Uniquement des faits vérifiables (existence de la marque/du modèle) ;
-- aucune donnée technique inventée. verification_status reste 'unverified'
-- jusqu'à revue par l'admin, conformément à la politique de contenu.

-- ============================================================
-- CAR_MAKES
-- ============================================================

insert into public.car_makes (name, slug, country_origin) values
  ('Alfa Romeo', 'alfa-romeo', 'Italie'),
  ('Audi', 'audi', 'Allemagne'),
  ('Mercedes-Benz', 'mercedes-benz', 'Allemagne'),
  ('Volvo', 'volvo', 'Suède'),
  ('Lancia', 'lancia', 'Italie'),
  ('Citroën', 'citroen', 'France'),
  ('Ford', 'ford', 'États-Unis'),
  ('Toyota', 'toyota', 'Japon'),
  ('Saab', 'saab', 'Suède'),
  ('Nissan', 'nissan', 'Japon')
on conflict (slug) do nothing;

-- ============================================================
-- CAR_MODELS
-- ============================================================

insert into public.car_models (make_id, name, slug, source_type, verification_status)
select m.id, v.name, v.slug, 'demo', 'unverified'
from (values
  ('alfa-romeo', 'Alfetta GTV', 'alfetta-gtv'),
  ('alfa-romeo', 'GTV6', 'gtv6'),
  ('alfa-romeo', '75', '75'),
  ('alfa-romeo', '33', '33'),
  ('alfa-romeo', 'Spider', 'spider'),

  ('audi', '80 Quattro', '80-quattro'),
  ('audi', 'Coupé GT', 'coupe-gt'),
  ('audi', '90 Quattro', '90-quattro'),
  ('audi', 'Coupé S2', 'coupe-s2'),

  ('mercedes-benz', '190E (W201)', '190e-w201'),
  ('mercedes-benz', 'Classe E (W124)', 'classe-e-w124'),
  ('mercedes-benz', '500E', '500e'),
  ('mercedes-benz', 'SL (R107)', 'sl-r107'),
  ('mercedes-benz', 'SL (R129)', 'sl-r129'),
  ('mercedes-benz', 'CLK (W208)', 'clk-w208'),
  ('mercedes-benz', 'SLK (R170)', 'slk-r170'),
  ('mercedes-benz', 'SEC (C126)', 'sec-c126'),
  ('mercedes-benz', 'CL (C140)', 'cl-c140'),
  ('mercedes-benz', '250D (W123)', '250d-w123'),

  ('volvo', '240', '240'),
  ('volvo', '740 Turbo', '740-turbo'),
  ('volvo', '850 T5-R', '850-t5-r'),

  ('lancia', 'Delta HF Integrale', 'delta-hf-integrale'),
  ('lancia', 'Beta Coupé', 'beta-coupe'),

  ('citroen', 'BX GTI', 'bx-gti'),
  ('citroen', 'CX', 'cx'),
  ('citroen', 'Visa GTI', 'visa-gti'),

  ('ford', 'Sierra Cosworth', 'sierra-cosworth'),
  ('ford', 'Escort RS Turbo', 'escort-rs-turbo'),
  ('ford', 'Capri', 'capri'),

  ('toyota', 'Supra', 'supra'),
  ('toyota', 'Celica GT-Four', 'celica-gt-four'),
  ('toyota', 'MR2', 'mr2'),

  ('saab', '900 Turbo', '900-turbo'),
  ('saab', '9000 Turbo', '9000-turbo'),

  ('nissan', '200SX', '200sx'),
  ('nissan', 'Skyline GT-R (R32)', 'skyline-gtr-r32')
) as v(make_slug, name, slug)
join public.car_makes m on m.slug = v.make_slug
on conflict (make_id, slug) do nothing;
