-- 0010_more_models_and_default_generations.sql
-- Ajout de modèles supplémentaires (BMW, Porsche, Peugeot) + génération
-- placeholder pour tout modèle qui n'en a pas encore + publication.
-- Uniquement des noms de modèles réels, aucune fiche technique inventée.

-- ============================================================
-- CAR_MODELS supplémentaires
-- ============================================================

insert into public.car_models (make_id, name, slug, source_type, verification_status)
select m.id, v.name, v.slug, 'demo', 'unverified'
from (values
  ('bmw', 'E36', 'e36'),
  ('bmw', 'Z3', 'z3'),
  ('bmw', 'Z1', 'z1'),

  ('porsche', 'Boxster', 'boxster'),
  ('porsche', '911', '911'),

  ('peugeot', '306', '306'),
  ('peugeot', '309', '309'),
  ('peugeot', '206', '206'),
  ('peugeot', '406', '406')
) as v(make_slug, name, slug)
join public.car_makes m on m.slug = v.make_slug
on conflict (make_id, slug) do nothing;

-- ============================================================
-- Génération placeholder pour tout modèle qui n'en a pas encore
-- (car_generations n'a pas de colonnes source_type/verification_status)
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
