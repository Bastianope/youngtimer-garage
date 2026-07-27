-- Youngtimer Garage
-- Migration 0003 — Storage pour les images du catalogue (Phase 1)

insert into storage.buckets (id, name, public)
values ('catalogue-images', 'catalogue-images', true)
on conflict (id) do nothing;

-- Lecture publique (bucket marqué public, mais on garde une policy
-- explicite plutôt que de dépendre uniquement du flag).
create policy "catalogue-images public read"
on storage.objects for select
using (bucket_id = 'catalogue-images');

-- Écriture réservée aux admin/editor.
create policy "catalogue-images admin write"
on storage.objects for insert
with check (bucket_id = 'catalogue-images' and public.is_admin_or_editor());

create policy "catalogue-images admin update"
on storage.objects for update
using (bucket_id = 'catalogue-images' and public.is_admin_or_editor())
with check (bucket_id = 'catalogue-images' and public.is_admin_or_editor());

create policy "catalogue-images admin delete"
on storage.objects for delete
using (bucket_id = 'catalogue-images' and public.is_admin_or_editor());
