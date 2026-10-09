-- Alertes e-mail : un membre est prévenu quand un véhicule du modèle choisi est mis en vente.
-- Inscription volontaire depuis la fiche modèle ; désinscription en un clic depuis l'e-mail (jeton).
-- Relançable sans risque.

create table if not exists public.listing_alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  model_id uuid not null references public.car_models(id) on delete cascade,
  unsubscribe_token uuid not null default gen_random_uuid() unique,
  created_at timestamptz not null default now(),
  unique (user_id, model_id)
);

create index if not exists listing_alerts_model_idx on public.listing_alerts (model_id);

alter table public.listing_alerts enable row level security;

drop policy if exists listing_alerts_select_own on public.listing_alerts;
create policy listing_alerts_select_own
on public.listing_alerts for select to authenticated
using (auth.uid() = user_id);

drop policy if exists listing_alerts_insert_own on public.listing_alerts;
create policy listing_alerts_insert_own
on public.listing_alerts for insert to authenticated
with check (auth.uid() = user_id);

drop policy if exists listing_alerts_delete_own on public.listing_alerts;
create policy listing_alerts_delete_own
on public.listing_alerts for delete to authenticated
using (auth.uid() = user_id);

-- Le jeton de désinscription n'est lu que côté serveur (clé service) ; les visiteurs n'ont aucun accès
revoke all on public.listing_alerts from anon, authenticated;
grant select (id, user_id, model_id, created_at) on public.listing_alerts to authenticated;
grant insert (user_id, model_id) on public.listing_alerts to authenticated;
grant delete on public.listing_alerts to authenticated;

notify pgrst, 'reload schema';
