# 0002 — Rôle admin du catalogue et modèle de propriété des véhicules

Statut : Partiellement actée (D.7 décidé ; D.1/D.4/D.5 recommandations par défaut, à confirmer avant la Phase 3)
Date : 2026-07-27

## Contexte

L'analyse initiale du pack de développement (`01_DB_SCHEMA.sql`) avait identifié
quatre points de vigilance. Cet ADR documente les orientations retenues.

## D.7 — Rôle admin du catalogue (DÉCIDÉ, à implémenter en Phase 1)

**Décision** : utiliser la colonne `profiles.role` déjà présente dans la
migration `0001_init.sql` (`user | editor | moderator | admin`), via une
fonction `SECURITY DEFINER` (ex. `is_admin_or_editor()`) qui vérifie le rôle
de l'utilisateur courant sans provoquer de récursion RLS (même pattern que
`handle_new_user`, `search_path` fixé). Cette fonction sera utilisée dans les
policies `USING`/`WITH CHECK` d'écriture sur `car_makes`, `car_models`,
`car_generations`, `car_versions` en Phase 1.

**Écarté** : une table de permissions séparée — sur-ingénierie pour un MVP à
un seul éditeur (le porteur du projet).

## D.1 — RLS véhicule public (recommandation par défaut, Phase 3)

Pas encore implémenté. Principe retenu par défaut, à reconfirmer en Phase 3 :
- `vehicles` : policy SELECT publique quand `privacy_level = 'public'`, en plus
  des policies existantes propriétaire/créateur.
- `vehicle_events` / `maintenance_records` / `vehicle_media` : policy SELECT
  publique conditionnée à `is_public = true` **et** au véhicule parent
  également `privacy_level = 'public'` (éviter qu'un enfant devienne public
  alors que le parent reste privé).
- `vehicle_documents` : jamais de policy publique, sans exception.
- `unlisted` : nécessitera probablement un accès par token/slug plutôt qu'une
  policy RLS simple — à concevoir en Phase 3.

## D.4 — Contrainte `is_current` (recommandation par défaut, Phase 3)

Pas encore implémenté. Solution retenue par défaut : index unique partiel
```sql
create unique index one_current_owner_per_vehicle
  on vehicle_ownerships (vehicle_id)
  where is_current = true;
```

## D.5 — Source de vérité propriétaire (recommandation par défaut, Phase 3)

Pas encore implémenté. Orientation retenue par défaut : garder
`vehicles.current_owner_user_id` comme colonne dénormalisée (cache), mais
alimentée exclusivement par un trigger sur `vehicle_ownerships` — jamais en
écriture directe applicative. `vehicle_ownerships` reste l'unique source de
vérité réelle. `garage_items.user_id` demeure indépendant par design : un
utilisateur peut suivre/rêver le véhicule d'un tiers dans son propre Garage,
ce n'est pas une relation de propriété réelle.

**Écarté** : supprimer entièrement `vehicles.current_owner_user_id` et
toujours joindre `vehicle_ownerships` — plus strict mais complexifie les
policies RLS (sous-requêtes au lieu d'une comparaison directe) pour un
bénéfice marginal.

## Note

D.1, D.4 et D.5 ne sont pas bloquants avant la Phase 3. Ils seront rediscutés
avec le code réel des véhicules sous les yeux avant d'être implémentés.
