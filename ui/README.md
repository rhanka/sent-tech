# UI SENT-tech

SPA SvelteKit statique consommant l'API Hono.

## Commandes (via Docker)

```bash
make install
docker compose run --rm workspace bash -lc "corepack enable; pnpm --filter sent-tech-ui dev -- --host 0.0.0.0 --port 5173"
docker compose run --rm workspace bash -lc "corepack enable; pnpm --filter sent-tech-ui build"
docker compose run --rm workspace bash -lc "corepack enable; pnpm --filter sent-tech-ui test"
```

## i18n

La configuration s'appuie sur `svelte-i18n` avec le français par défaut.
