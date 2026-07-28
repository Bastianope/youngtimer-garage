-- Même erreur que pour vehicles: la policy vérifiait vehicles.current_owner_user_id,
-- qui est encore null au moment de cette insertion (il est alimenté ensuite par le
-- trigger sync_vehicle_current_owner). Corrigé pour vérifier directement la colonne
-- qu'on insère nous-mêmes (user_id), ce qui suffit à garantir qu'on ne peut créer
-- une ownership qu'en son propre nom.
drop policy if exists vehicle_ownerships_insert_owner on public.vehicle_ownerships;

create policy vehicle_ownerships_insert_self
on public.vehicle_ownerships for insert
with check (auth.uid() = user_id);
