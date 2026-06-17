import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { db, serviceCatalog } from '../db/index.js';
import { serviceSchema } from '../schemas/serviceCatalog.js';
import { jsonOk } from '../utils/http.js';

export const servicesRouter = new Hono();

servicesRouter.get('/', async (c) => {
  const data = await db.select().from(serviceCatalog);
  return jsonOk(c, data);
});

servicesRouter.post('/', zValidator('json', serviceSchema), async (c) => {
  const body = c.req.valid('json');
  const [inserted] = await db.insert(serviceCatalog).values(body).returning();
  return jsonOk(c, inserted);
});
