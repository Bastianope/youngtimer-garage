-- 0011_catalogue_expansion_2.sql
-- Nouvelles marques et modèles youngtimer, + génération placeholder
-- et publication pour tout modèle qui n'en a pas encore.
-- Uniquement des noms de modèles réels, aucune fiche technique inventée.

-- ============================================================
-- CAR_MAKES supplémentaires
-- ============================================================

insert into public.car_makes (name, slug, country_origin) values
  ('Opel', 'opel', 'Allemagne'),
  ('Fiat', 'fiat', 'Italie'),
  ('Honda', 'honda', 'Japon'),
  ('Mazda', 'mazda', 'Japon'),
  ('Subaru', 'subaru', 'Japon'),
  ('Mitsubishi', 'mitsubishi', 'Japon'),
  ('Jaguar', 'jaguar', 'Royaume-Uni')
on conflict (slug) do nothing;

-- ============================================================
-- CAR_MODELS supplémentaires
-- ============================================================

insert into public.car_models (make_id, name, slug, source_type, verification_status)
select m.id, v.name, v.slug, 'demo', 'unverified'
from (values
  ('bmw', 'E34', 'e34'),
  ('bmw', 'E32', 'e32'),
  ('bmw', 'Série 8 (E31)', 'serie-8-e31'),

  ('porsche', '924', '924'),
  ('porsche', '928', '928'),
  ('porsche', '968', '968'),

  ('peugeot', '405', '405'),
  ('peugeot', '106', '106'),

  ('renault', '19', '19'),
  ('renault', '21', '21'),
  ('renault', 'Alpine GTA', 'alpine-gta'),
  ('renault', 'Fuego', 'fuego'),
  ('renault', 'Twingo', 'twingo'),

  ('volkswagen', 'Scirocco', 'scirocco'),
  ('volkswagen', 'Corrado', 'corrado'),
  ('volkswagen', 'Passat B3', 'passat-b3'),

  ('citroen', 'Xantia', 'xantia'),
  ('citroen', 'ZX', 'zx'),
  ('citroen', 'AX', 'ax'),
  ('citroen', 'Saxo', 'saxo'),

  ('opel', 'Manta', 'manta'),
  ('opel', 'Kadett GSI', 'kadett-gsi'),
  ('opel', 'Calibra', 'calibra'),

  ('fiat', 'Uno Turbo', 'uno-turbo'),
  ('fiat', 'X1/9', 'x1-9'),

  ('honda', 'CRX', 'crx'),
  ('honda', 'Prelude', 'prelude'),
  ('honda', 'Integra Type R', 'integra-type-r'),

  ('mazda', 'RX-7', 'rx-7'),
  ('mazda', 'MX-5', 'mx-5'),

  ('subaru', 'Impreza WRX', 'impreza-wrx'),

  ('mitsubishi', 'Galant VR-4', 'galant-vr4'),
  ('mitsubishi', 'Starion', 'starion'),

  ('jaguar', 'XJS', 'xjs')
) as v(make_slug, name, slug)
join public.car_makes m on m.slug = v.make_slug
on conflict (make_id, slug) do nothing;

-- ============================================================
-- Génération placeholder pour tout modèle qui n'en a pas encore
-- ============================================================

insert into public.car_generations (model_id, name)
select cm.id, cm.name || ' — édition à vérifier'
from public.car_models cm
where not exists (
  select 1 from public.car_generations cg where cg.model_id = cm.id
);

-- ============================================================
-- Publication des modèles non encore publiés
-- ============================================================

update public.car_models
set published_at = now()
where published_at is null;
