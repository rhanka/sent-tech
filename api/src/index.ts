import { serve } from '@hono/node-server';
import app from './app.js';
import { env } from './env.js';

serve({
  fetch: app.fetch,
  port: env.port
});

console.log(`API server listening on port ${env.port}`);
