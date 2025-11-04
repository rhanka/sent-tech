# UI SENT-tech

SPA SvelteKit statique consommant l'API Hono.

## Commandes (via Docker)

```bash
make install
docker compose run --rm workspace bash -lc "npm run dev --workspace=sent-tech-ui -- --host 0.0.0.0 --port 5173"
docker compose run --rm workspace bash -lc "npm run build --workspace=sent-tech-ui"
docker compose run --rm workspace bash -lc "npm run test --workspace=sent-tech-ui"
```

## i18n

La configuration s'appuie sur `svelte-i18n` avec le français par défaut.
