# Youngtimer Garage

**Ton garage. Leur histoire.**

Plateforme française pour les passionnés de voitures youngtimer et
classiques modernes.

## État du projet

**Phase 0 — Fondation.** Aucune fonctionnalité métier (catalogue, garage,
véhicules, annonces, écosystème) n'est encore implémentée. Voir
`docs/decisions/` pour les décisions d'architecture prises à ce stade, et
le pack de développement (transmis séparément) pour la vision complète du
produit et le découpage en phases.

## Stack

Next.js (App Router) · TypeScript strict · Tailwind CSS · Supabase
(PostgreSQL, Auth, RLS) · Vercel · pnpm · Zod · Vitest · Playwright

## Démarrage local

```bash
pnpm install
cp .env.example .env.local
# renseigner NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY
# dans .env.local (valeurs du dashboard Supabase, jamais committées)
pnpm dev
```

## Commandes

```bash
pnpm lint             # ESLint
pnpm typecheck        # tsc --noEmit
pnpm test             # tests unitaires (Vitest)
pnpm test:integration # tests RLS — nécessite une instance Supabase locale
pnpm test:e2e         # tests E2E (Playwright) — build + serveur local
pnpm build            # build de production
```

### Tests d'intégration RLS

Nécessitent le CLI Supabase et Docker :

```bash
supabase start
# noter les clés anon/service_role affichées, puis créer .env.test.local :
# SUPABASE_TEST_URL=http://127.0.0.1:54321
# SUPABASE_TEST_ANON_KEY=...
# SUPABASE_TEST_SERVICE_ROLE_KEY=...
pnpm test:integration
```

Ce fichier `.env.test.local` ne doit jamais être committé (déjà exclu par
`.gitignore` via le motif `.env*`).

## Migrations

```bash
supabase db push        # applique les migrations au projet lié
# ou, en local :
supabase start
supabase db reset
```

La migration `0001_init.sql` ne contient que la fondation nécessaire à
l'authentification (`profiles` + RLS). Aucune table métier n'existe
encore — voir `docs/decisions/0001-foundation-stack.md`.

## Structure

```
app/                Routes (App Router)
components/          Composants React, organisés par domaine
lib/                 Logique applicative (supabase, auth, validation...)
supabase/migrations/ Migrations SQL
tests/               unit/ · integration/ · e2e/
docs/decisions/      Décisions d'architecture (ADR)
```

## Variables d'environnement

Voir `.env.example`. `SUPABASE_SERVICE_ROLE_KEY` ne doit jamais être
commitée ni utilisée côté client — elle n'est pas encore nécessaire en
Phase 0.
