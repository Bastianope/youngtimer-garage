-- Lien « Trouver des pièces » sur la fiche modèle et mention HistoVec sur les annonces de véhicules.
-- Relançable sans risque.

-- 1. Lien vers une recherche de pièces propre à chaque modèle (renseigné par l'administrateur)
alter table public.car_models add column if not exists parts_search_url text;
alter table public.car_models drop constraint if exists car_models_parts_search_url_https;
alter table public.car_models add constraint car_models_parts_search_url_https
  check (parts_search_url is null or parts_search_url ~ '^https://');

-- Pages Opisto vérifiées le 10/10/2026 (un modèle absent du catalogue est simplement ignoré)
update public.car_models m
set parts_search_url = 'https://www.opisto.fr/fr/auto/pieces-occasion/toutes-pieces/' || v.opisto || '/page-1'
from public.car_makes k,
  (values
    ('bmw', 'e30', 'bmw/serie-3-e30'),
    ('bmw', 'e36', 'bmw/serie-3-e36'),
    ('bmw', 'serie-3-e46', 'bmw/serie-3-e46'),
    ('bmw', 'serie-5-e28', 'bmw/serie-5-e28'),
    ('bmw', 'e34', 'bmw/serie-5-e34'),
    ('bmw', 'serie-5-e39', 'bmw/serie-5-e39'),
    ('bmw', 'e24', 'bmw/serie-6-e24'),
    ('bmw', 'serie-6-e63', 'bmw/serie-6-e63'),
    ('bmw', 'serie-7-e23', 'bmw/serie-7-e23'),
    ('bmw', 'e32', 'bmw/serie-7-e32'),
    ('bmw', 'serie-7-e38', 'bmw/serie-7-e38'),
    ('bmw', 'serie-7-e65', 'bmw/serie-7-e65'),
    ('bmw', 'serie-8-e31', 'bmw/serie-8-e31'),
    ('bmw', 'z3', 'bmw/z3-e36'),
    ('mercedes-benz', '190e-w201', 'mercedes/190-w201'),
    ('mercedes-benz', 'classe-e-w124', 'mercedes/classe-e-124'),
    ('mercedes-benz', 'sl-r107', 'mercedes/classe-sl-r107'),
    ('mercedes-benz', 'sl-r129', 'mercedes/classe-sl-129'),
    ('mercedes-benz', 'clk-w208', 'mercedes/classe-clk-208'),
    ('mercedes-benz', 'slk-r170', 'mercedes/classe-slk-170'),
    ('mercedes-benz', 'classe-s-w126', 'mercedes/classe-s-w126'),
    ('mercedes-benz', 'classe-s-w220', 'mercedes/classe-s-220'),
    ('mercedes-benz', '250d-w123', 'mercedes/250-w123'),
    ('volkswagen', 'golf-1', 'volkswagen/golf-1'),
    ('volkswagen', 'golf-3', 'volkswagen/golf-3'),
    ('porsche', '924', 'porsche/924'),
    ('porsche', '928', 'porsche/928'),
    ('porsche', '968', 'porsche/968'),
    ('porsche', 'boxster', 'porsche/boxster-1-986')
  ) as v(make, slug, opisto)
where k.id = m.make_id and k.slug = v.make and m.slug = v.slug and m.parts_search_url is null;

-- 2. Annonce de véhicule : le vendeur indique qu'il peut fournir le rapport HistoVec officiel
alter table public.vehicle_listings add column if not exists histovec_available boolean not null default false;
grant select (histovec_available) on public.vehicle_listings to anon;
grant insert (histovec_available), update (histovec_available) on public.vehicle_listings to authenticated;

notify pgrst, 'reload schema';

-- Contrôle : modèles ayant un lien pièces
select k.name as marque, m.name as modele, m.parts_search_url
from public.car_models m join public.car_makes k on k.id = m.make_id
where m.parts_search_url is not null
order by 1, 2;
