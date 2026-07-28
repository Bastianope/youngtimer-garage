-- Youngtimer Garage — seed de données de développement
--
-- Modèles de démonstration clairement étiquetés (03_PHASE_PROMPTS.md,
-- Phase 1). Uniquement des faits non contestables (nom, marque, plage
-- d'années de génération largement documentée) : aucune caractéristique
-- technique précise n'est inventée. Toutes les lignes restent
-- `verification_status = 'unverified'` par défaut et non publiées —
-- à publier manuellement depuis /admin/modeles une fois relues.

insert into public.car_makes (name, slug, country_origin) values
  ('BMW', 'bmw', 'Allemagne'),
  ('Peugeot', 'peugeot', 'France'),
  ('Renault', 'renault', 'France'),
  ('Volkswagen', 'volkswagen', 'Allemagne'),
  ('Porsche', 'porsche', 'Allemagne')
on conflict (slug) do nothing;

insert into public.car_models (make_id, name, slug, description, source_name)
select m.id, v.name, v.slug, v.description, 'Seed de démonstration — à vérifier'
from public.car_makes m
join (values
  ('bmw', 'E30', 'e30', 'Génération compacte de la Série 3, produite dans les années 1980-1990.'),
  ('peugeot', '205 GTI', '205-gti', 'Version sportive de la Peugeot 205, emblématique des années 1980.'),
  ('renault', '5 GT Turbo', '5-gt-turbo', 'Version turbocompressée de la Renault 5, fin des années 1980.'),
  ('volkswagen', 'Golf GTI II', 'golf-gti-ii', 'Deuxième génération de la Golf GTI.'),
  ('renault', 'Clio Williams', 'clio-williams', 'Version sportive limitée de la Renault Clio, années 1990.'),
  ('porsche', '944', '944', 'Coupé sportif Porsche produit dans les années 1980-1990.')
) as v(make_slug, name, slug, description) on v.make_slug = m.slug
on conflict (make_id, slug) do nothing;
