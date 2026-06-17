import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { env } from './env.js';
import { missionsRouter } from './routes/missions.js';
import { servicesRouter } from './routes/services.js';
import { assetsRouter } from './routes/assets.js';
import { exportsRouter } from './routes/exports.js';

const app = new Hono();

app.use('*', cors({ origin: env.corsAllowedOrigins }));

app.route('/api/v1/missions', missionsRouter);
app.route('/api/v1/services', servicesRouter);
app.route('/api/v1/assets', assetsRouter);
app.route('/api/v1/exports', exportsRouter);

app.get('/healthz', (c) => c.json({ status: 'ok' }));

export default app;
