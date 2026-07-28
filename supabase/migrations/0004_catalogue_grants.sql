-- Youngtimer Garage
-- Migration 0004 — Autorisations Postgres pour le catalogue (Phase 1)
--
-- RLS filtre les lignes, mais nécessite en plus un droit d'accès basique
-- (GRANT) sur la table elle-même pour les rôles anon/authenticated utilisés
-- par l'API Supabase. Ce droit ne s'était pas propagé automatiquement aux
-- nouvelles tables créées par la migration 0002.

grant usage on schema public to anon, authenticated;

grant select on public.car_makes to anon, authenticated;
grant insert, update, delete on public.car_makes to authenticated;

grant select on public.car_models to anon, authenticated;
grant insert, update, delete on public.car_models to authenticated;

grant select on public.car_generations to anon, authenticated;
grant insert, update, delete on public.car_generations to authenticated;

grant select on public.car_versions to anon, authenticated;
grant insert, update, delete on public.car_versions to authenticated;

grant execute on function public.is_admin_or_editor() to anon, authenticated;
