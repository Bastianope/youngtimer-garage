-- Liens supplémentaires vers des boutiques de pièces, par modèle du catalogue (Octoclassic, etc.).
-- Lecture publique, écriture réservée aux administrateurs. Relançable sans risque.

create table if not exists public.model_part_links (
  id uuid primary key default gen_random_uuid(),
  model_id uuid not null references public.car_models(id) on delete cascade,
  label text not null check (char_length(label) between 2 and 60),
  url text not null check (url ~ '^https://'),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (model_id, url)
);

create index if not exists model_part_links_model_idx on public.model_part_links (model_id, sort_order);

alter table public.model_part_links enable row level security;

drop policy if exists model_part_links_select_all on public.model_part_links;
create policy model_part_links_select_all on public.model_part_links for select using (true);

drop policy if exists model_part_links_admin_write on public.model_part_links;
create policy model_part_links_admin_write on public.model_part_links for all to authenticated
  using (public.is_admin_or_editor()) with check (public.is_admin_or_editor());

revoke all on public.model_part_links from anon, authenticated;
grant select on public.model_part_links to anon, authenticated;
grant insert, update, delete on public.model_part_links to authenticated;
grant select on public.model_part_links to service_role;

-- Catégories Octoclassic vérifiées le 10/10/2026 (un modèle absent du catalogue est simplement ignoré)
insert into public.model_part_links (model_id, label, url, sort_order)
select m.id, 'Octoclassic', 'https://octoclassic.com/product-category/' || v.path, 20
from public.car_models m
join public.car_makes k on k.id = m.make_id
join (values
  ('bmw', 'e30', 'bmw/e30'),
  ('bmw', 'e36', 'bmw/e36'),
  ('bmw', 'serie-3-e46', 'bmw/e46'),
  ('bmw', 'serie-5-e28', 'bmw/e28'),
  ('bmw', 'e34', 'bmw/e34'),
  ('bmw', 'serie-5-e39', 'bmw/e39'),
  ('bmw', 'e24', 'bmw/e24'),
  ('bmw', 'serie-6-e63', 'bmw/e63'),
  ('bmw', 'serie-7-e23', 'bmw/e23'),
  ('bmw', 'e32', 'bmw/e32'),
  ('bmw', 'serie-7-e38', 'bmw/e38'),
  ('bmw', 'serie-7-e65', 'bmw/e65'),
  ('bmw', 'serie-8-e31', 'bmw/e31'),
  ('bmw', 'z1', 'bmw/z1'),
  ('bmw', 'z3', 'bmw/z3'),
  ('mercedes-benz', '190e-w201', 'mercedes-benz/w201'),
  ('mercedes-benz', 'classe-e-w124', 'mercedes-benz/w124'),
  ('mercedes-benz', '500e', 'mercedes-benz/w124/e500-500e'),
  ('mercedes-benz', 'sl-r107', 'mercedes-benz/w107/r107'),
  ('mercedes-benz', 'sl-r129', 'mercedes-benz/r129'),
  ('mercedes-benz', 'clk-w208', 'mercedes-benz/w208'),
  ('mercedes-benz', 'slk-r170', 'mercedes-benz/r170'),
  ('mercedes-benz', 'sec-c126', 'mercedes-benz/w126/c126-sec'),
  ('mercedes-benz', 'cl-c140', 'mercedes-benz/w140/w140cl'),
  ('mercedes-benz', 'classe-s-w126', 'mercedes-benz/w126'),
  ('mercedes-benz', 'classe-s-w140', 'mercedes-benz/w140'),
  ('mercedes-benz', 'classe-s-w220', 'mercedes-benz/w220'),
  ('mercedes-benz', '250d-w123', 'mercedes-benz/w123'),
  ('porsche', '911', 'porsche/911'),
  ('porsche', '924', 'porsche/924'),
  ('porsche', '928', 'porsche/928'),
  ('porsche', '968', 'porsche/968'),
  ('porsche', 'boxster', 'porsche/boxster'),
  ('volkswagen', 'golf-1', 'volkswagen/golf-mk1'),
  ('volkswagen', 'golf-3', 'volkswagen/golf-mk3'),
  ('volkswagen', 'golf-4', 'volkswagen/golf-mk4'),
  ('volkswagen', 'corrado', 'volkswagen/corrado'),
  ('volkswagen', 'jetta', 'volkswagen/jetta'),
  ('volkswagen', 'scirocco', 'volkswagen/scirocco'),
  ('volkswagen', 'transporter-t3', 'volkswagen/transporter'),
  ('volkswagen', 'transporter-t4', 'volkswagen/transporter')
) as v(make, slug, path) on v.make = k.slug and v.slug = m.slug
on conflict (model_id, url) do nothing;

notify pgrst, 'reload schema';

-- Contrôle
select k.name as marque, m.name as modele, l.label, l.url
from public.model_part_links l
join public.car_models m on m.id = l.model_id
join public.car_makes k on k.id = m.make_id
order by 1, 2;
