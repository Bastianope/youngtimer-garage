# Attribuer le rôle admin

Ce script n'est **pas** une migration versionnée : c'est une action manuelle,
à exécuter une seule fois via le SQL Editor du dashboard Supabase, pour
attribuer le rôle admin à ton propre compte.

## Étapes

1. Crée d'abord ton compte via `/auth/inscription` sur le site (si pas déjà fait).
2. Ouvre le SQL Editor sur `supabase.com/dashboard/project/<ton-projet>/sql/new`.
3. Trouve ton `id` utilisateur :

```sql
select id, email from auth.users where email = 'ton-email@exemple.com';
```

4. Attribue le rôle admin avec l'`id` trouvé :

```sql
update public.profiles
set role = 'admin'
where id = '<uuid-copié-à-l-étape-précédente>';
```

5. Vérifie :

```sql
select id, role from public.profiles where role = 'admin';
```

Une fois fait, reconnecte-toi sur le site (ou rafraîchis la page) : les liens
`/admin/...` deviennent accessibles.
