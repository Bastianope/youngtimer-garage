-- La policy d'origine exigeait auth.uid() = current_owner_user_id à l'insert,
-- mais cette colonne est toujours null au moment de la création (elle n'est
-- alimentée qu'ensuite par le trigger sync_vehicle_current_owner sur
-- vehicle_ownerships). Corrigé pour autoriser tout utilisateur authentifié
-- à créer un véhicule ; la propriété réelle est garantie par vehicle_ownerships,
-- pas par cette policy d'insertion.
drop policy if exists vehicles_insert_owner on public.vehicles;

create policy vehicles_insert_authenticated
on public.vehicles for insert
with check (auth.uid() is not null);
