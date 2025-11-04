# API SENT-tech

API REST construite avec Hono, Drizzle et Zod.

## Commandes (via Docker)

```bash
make install               # installe toutes les dépendances pnpm dans les conteneurs
docker compose run --rm workspace bash -lc "corepack enable; pnpm --filter sent-tech-api dev"
docker compose run --rm workspace bash -lc "corepack enable; pnpm --filter sent-tech-api test"
docker compose run --rm workspace bash -lc "corepack enable; pnpm --filter sent-tech-api lint"
```

## Migrations & seed

```bash
make migrate
make seed
```

Ces commandes supposent que Postgres tourne via `docker compose up -d db` et utilisent le schéma défini dans `src/db/schema.ts`.
