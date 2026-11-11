-- Catalogue : modèles exotiques ajoutés pour les nouveaux dossiers (Alpine A610, Venturi 260 et
-- Atlantique, Lancia Thema). Descriptions tirées des recherches des dossiers, statut « à vérifier ».
-- Relançable sans risque. À lancer dans le SQL Editor Supabase AVANT de merger la PR.

insert into public.car_makes (name, slug, country_origin) values
  ('Venturi', 'venturi', 'France')
on conflict (slug) do nothing;

insert into public.car_models (make_id, name, slug, description, source_type, source_name, verification_status, published_at)
select mk.id, v.name, v.slug, v.description, 'demo', 'Dossiers Youngtimer Garage', 'unverified', now()
from (values
  ('alpine', 'A610', 'a610',
   'Dernière Alpine de Dieppe avant la renaissance de la marque, produite de 1991 à 1995 à 818 exemplaires. Châssis-poutre en acier, carrosserie composite et V6 PRV turbo de 3 litres et 250 ch en porte-à-faux arrière. Héritière de la GTA, dont elle ne reprend que les vitres.'),
  ('venturi', '260', '260',
   'Coupé GT français de la Manufacture de Voitures de Sport (MVS), à moteur V6 PRV turbo de 2,85 litres et 260 ch. Version la plus radicale des premières Venturi, déclinée en série allégée 260 Atlantique (25 exemplaires, 1991) et 260 LM.'),
  ('venturi', 'Atlantique', 'atlantique',
   'Dernière GT de Venturi, présentée en 1995 : V6 PRV de 3 litres atmosphérique (210 ch), turbo (281 ch) ou biturbo (310 ch), sur le châssis de la 400 GT. Produite à une soixantaine d''exemplaires selon Essais Autos.'),
  ('lancia', 'Thema', 'thema',
   'Grande berline Lancia lancée en 1984. Sa version 8.32 (1986-1992) reçoit un V8 de 2,9 litres et 32 soupapes dérivé de la Ferrari 308 Quattrovalvole, de 215 ch (205 ch catalysée), un aileron arrière rétractable et un intérieur Poltrona Frau. Produite à 3 971 exemplaires.')
) as v(make_slug, name, slug, description)
join public.car_makes mk on mk.slug = v.make_slug
on conflict do nothing;

-- Une génération par modèle, pour que les fiches et le parcours « Mon Garage » fonctionnent
insert into public.car_generations (model_id, name, year_start, year_end, body_type)
select m.id, g.name, g.year_start, g.year_end, g.body_type
from (values
  ('alpine', 'a610', 'A610', 1991, 1995, 'coupé'),
  ('venturi', '260', '260', 1990, 1995, 'coupé'),
  ('venturi', 'atlantique', 'Atlantique 300', 1995, 2000, 'coupé'),
  ('lancia', 'thema', 'Thema 8.32', 1986, 1992, 'berline')
) as g(make_slug, model_slug, name, year_start, year_end, body_type)
join public.car_makes mk on mk.slug = g.make_slug
join public.car_models m on m.make_id = mk.id and m.slug = g.model_slug
where not exists (select 1 from public.car_generations x where x.model_id = m.id);

notify pgrst, 'reload schema';

-- Contrôle : 4 lignes attendues, chacune avec sa génération
select mk.slug as marque, m.slug as modele, count(g.id) as generations
from public.car_models m
join public.car_makes mk on mk.id = m.make_id
left join public.car_generations g on g.model_id = m.id
where (mk.slug, m.slug) in (('alpine', 'a610'), ('venturi', '260'), ('venturi', 'atlantique'), ('lancia', 'thema'))
group by 1, 2 order by 1, 2;
