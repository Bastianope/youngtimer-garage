# 0001 — Stack de fondation

Statut : Acceptée
Date : 2026-07-27

## Contexte

Youngtimer Garage démarre sur une base vierge (repo GitHub, projet
Supabase et projet Vercel tous nouvellement créés, aucune donnée
existante). Le pack de développement (`00_MASTER_SPEC.md`,
`02_CLAUDE_MASTER_PROMPT.md`, `05_ENVIRONMENT_AND_SETUP.md`) fixe déjà le
stack cible. Cet ADR documente les choix concrets faits en Phase 0 et les
écarts, même mineurs, par rapport au pack initial.

## Décision

- **Next.js App Router + TypeScript strict + Tailwind CSS**, scaffoldé via
  `create-next-app`, sans `src/` (structure `app/` à la racine, conforme à
  `00_MASTER_SPEC.md` §15).
- **Supabase** pour Auth, PostgreSQL et (plus tard) Storage, avec
  l'approche SSR actuelle (`@supabase/ssr`), jamais les auth-helpers
  dépréciés.
- **Vercel** pour le déploiement, connecté au repo GitHub dès sa création.
- **pnpm** comme gestionnaire de paquets (lockfile fait foi).
- **Zod** pour toute validation (formulaires, variables d'environnement).
- **Vitest** pour les tests unitaires et d'intégration, **Playwright**
  pour l'E2E — conformes au pack.

## Compromis et écarts documentés

### 1. Trigger `handle_new_user` (ajout par rapport au schéma initial)

Le schéma SQL du pack ne prévoyait pas de mécanisme automatique de
création de ligne `profiles` à l'inscription. En pratique, sans lui, un
utilisateur peut s'inscrire via Supabase Auth (table `auth.users`) sans
jamais obtenir de ligne correspondante dans `public.profiles`, si l'appel
applicatif d'insertion échoue ou est oublié — ce qui casserait
silencieusement toute page qui suppose l'existence d'un profil.

**Choix** : un trigger `on_auth_user_created` (`SECURITY DEFINER`) crée
automatiquement la ligne `profiles` à l'inscription.

**Compromis** : une fonction `SECURITY DEFINER` doit être auditée avec
soin (elle contourne RLS par nature) — elle est volontairement minimale
(un seul `insert`, `search_path` fixé) pour limiter la surface de risque.

### 2. Séparation tests unitaires / intégration / E2E

Le pack mentionne Vitest et Playwright sans détailler l'organisation.

**Choix** : trois commandes distinctes (`test`, `test:integration`,
`test:e2e`), les tests d'intégration RLS étant conçus pour tourner contre
une instance Supabase locale (`supabase start`) et non contre l'instance
de développement/production distante. Ils sont ignorés automatiquement
(skip) si aucune instance locale n'est configurée, plutôt que de faire
échouer la CI.

**Conséquence** : la CI GitHub Actions (Phase 0) ne fait tourner que
lint/typecheck/tests unitaires/build. Les tests RLS et Playwright
restent, pour l'instant, une vérification locale manuelle — brancher une
instance Supabase éphémère dans la CI est une amélioration possible mais
non nécessaire pour valider la fondation.

### 3. Policy de lecture publique des profils — non ajoutée

Le pack évoque la possibilité de champs de profil publics (pseudo,
avatar) consultables par d'autres utilisateurs. Aucune policy RLS de
lecture publique n'a été ajoutée en Phase 0 : décision volontairement
reportée, à trancher explicitement (probablement via une vue dédiée aux
champs publics plutôt qu'un accès direct à la table) avant que cette
fonctionnalité ne soit réellement nécessaire.

### 4. Pas de `next/font/google` en Phase 0

`create-next-app` configure par défaut les polices Geist via
`next/font/google`, qui nécessite un accès réseau à `fonts.googleapis.com`
au moment du build. Cette dépendance réseau au build est fragile (échoue
dans un environnement sans accès sortant à Google, y compris dans mon
bac à sable de développement) et de toute façon non définitive : la
direction visuelle du produit (`00_MASTER_SPEC.md`, section UI) n'a pas
encore été implémentée en Phase 0.

**Choix** : pile de polices système via la classe utilitaire Tailwind
`font-sans`, sans dépendance réseau au build. Les polices de marque
définitives seront choisies lors de l'implémentation de la direction
visuelle (au plus tard en Phase 2/7).

## Ce qui n'a pas été fait (volontairement)

Aucune table métier (catalogue, garage, véhicules, annonces, contenu,
alertes) n'a été créée. Aucune décision structurante concernant les
points de vigilance identifiés dans la revue du schéma SQL initial (RLS
véhicule public, contrainte `is_current` sur `vehicle_ownerships`,
unification de la source de vérité "propriétaire", policies admin du
catalogue) n'a été appliquée — ils restent à trancher avant les Phases 1
et 3 respectivement.
