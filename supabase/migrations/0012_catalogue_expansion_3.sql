-- 0012_catalogue_expansion_3.sql
-- Nouveaux modèles sur marques déjà existantes, + génération placeholder
-- et publication pour tout modèle qui n'en a pas encore.
-- Uniquement des noms de modèles réels, aucune fiche technique inventée.

-- ============================================================
-- CAR_MODELS supplémentaires
-- ============================================================

insert into public.car_models (make_id, name, slug, source_type, verification_status)
select m.id, v.name, v.slug, 'demo', 'unverified'
from (values
  ('alfa-romeo', 'Alfasud', 'alfasud'),

  ('fiat', 'Barchetta', 'barchetta'),

  ('renault', 'Spider', 'spider'),
  ('renault', 'Clio R32', 'clio-r32'),

  ('volkswagen', 'Golf I', 'golf-1'),
  ('volkswagen', 'Golf III', 'golf-3'),
  ('volkswagen', 'Golf IV', 'golf-4'),
  ('volkswagen', 'Jetta', 'jetta')
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
