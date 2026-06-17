# API SENT-tech

API REST construite avec Hono, Drizzle et Zod.

## Commandes (via Docker)

```bash
make install               # installe toutes les dépendances npm dans les conteneurs
docker compose run --rm workspace bash -lc "npm run dev --workspace=sent-tech-api"
docker compose run --rm workspace bash -lc "npm run test --workspace=sent-tech-api"
docker compose run --rm workspace bash -lc "npm run lint --workspace=sent-tech-api"
```

## Migrations & seed

```bash
make migrate
make seed
```

Ces commandes supposent que Postgres tourne via `docker compose up -d db` et utilisent le schéma défini dans `src/db/schema.ts`.
