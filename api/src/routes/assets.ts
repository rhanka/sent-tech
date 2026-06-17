import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { db, asset, mission } from '../db/index.js';
import { assetSchema, generateAssetsSchema } from '../schemas/asset.js';
import { jsonOk } from '../utils/http.js';
import { eq } from 'drizzle-orm';

export const assetsRouter = new Hono();

assetsRouter.get('/', async (c) => {
  const data = await db.select().from(asset);
  return jsonOk(c, data);
});

assetsRouter.post('/', zValidator('json', assetSchema), async (c) => {
  const body = c.req.valid('json');
  const [inserted] = await db.insert(asset).values(body).returning();
  return jsonOk(c, inserted);
});

assetsRouter.post('/generate', zValidator('json', generateAssetsSchema), async (c) => {
  const { missionId } = c.req.valid('json');
  const [missionRow] = await db.select().from(mission).where(eq(mission.id, missionId));
  if (!missionRow) {
    return c.json({ error: 'Mission not found' }, 404);
  }
  const generated = [
    {
      missionId,
      title: `Résumé ${missionRow.title}`,
      type: 'summary',
      content: missionRow.context?.slice(0, 280) ?? ''
    },
    {
      missionId,
      title: 'KPIs clés',
      type: 'kpi',
      content: '- ROI : +25%\n- Satisfaction client : 4.8/5'
    }
  ];
  const inserted = await db.insert(asset).values(generated).returning();
  return jsonOk(c, inserted);
});
