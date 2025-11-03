# SENT-tech Offer Builder

Monorepo full-stack suivant la structure du projet de référence `top-ai-ideas-fullstack`. Il comprend une SPA SvelteKit statique,
une API Hono/Drizzle et une suite de tests (Vitest + Playwright) orchestrée via Makefile, Docker Compose et GitHub Actions.

## Prérequis

- Node.js 20+
- pnpm 8+
- Docker & Docker Compose

## Installation

```bash
pnpm install
```

## Commandes principales

- `make dev` : lance l'API, l'UI et Postgres via Docker Compose (avec seed de base).
- `make lint` : lance ESLint dans l'UI et l'API (`make lint-api` / `make lint-ui`).
- `make test` : exécute les tests Vitest (API & UI) puis les tests Playwright (`make test-api`, `make test-ui`, `make test-e2e`).
- `make build` : construit les artefacts UI (SPA statique) et API (`make build-ui`, `make build-api`).
- `make migrate` : applique les migrations Drizzle sur la base configurée.
- `make seed` : insère les données d'exemple dans Postgres.

## Intégration continue & déploiement

- `.github/workflows/ci.yml` : lint + tests (unitaires & e2e) sur chaque push / pull request.
- `.github/workflows/deploy-ui.yml` : build et publication de la SPA SvelteKit sur GitHub Pages.

Les workflows GitHub Actions s'appuient exclusivement sur les cibles Make ci-dessus.

## Structure

- `api/` : service Hono + Drizzle + Zod.
- `ui/` : SvelteKit 5 (mode SPA statique) + svelte-i18n.
- `e2e/` : tests Playwright.
- `scripts/` : scripts de maintenance (ex: ingestion de CV).

## Variables d'environnement

Consultez `api/.env.example` et `ui/.env.example`.

## Ingestion de CV

Un script `scripts/ingest-cv.ts` permet de segmenter un CV brut et d'insérer les missions correspondantes dans Postgres :

```bash
pnpm --filter sent-tech-api exec tsx ../scripts/ingest-cv.ts ./data/cv.txt CV_2024_FR
```

## Licences

Ce projet est livré tel quel pour prototypage interne SENT-tech.
