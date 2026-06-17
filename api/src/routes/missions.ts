import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { db, mission } from '../db/index.js';
import { anonymizeText } from '../services/anonymizer.js';
import { ingestMissionSchema, missionSchema, anonymizeMissionSchema } from '../schemas/mission.js';
import { jsonOk } from '../utils/http.js';
import { eq } from 'drizzle-orm';

export const missionsRouter = new Hono();

missionsRouter.get('/', async (c) => {
  const data = await db.select().from(mission);
  return jsonOk(c, data);
});

missionsRouter.post('/', zValidator('json', missionSchema), async (c) => {
  const body = c.req.valid('json');
  const [inserted] = await db.insert(mission).values(body).returning();
  return jsonOk(c, inserted);
});

missionsRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const [row] = await db.select().from(mission).where(eq(mission.id, id));
  if (!row) {
    return c.json({ error: 'Mission not found' }, 404);
  }
  return jsonOk(c, row);
});

missionsRouter.put('/:id', zValidator('json', missionSchema.partial()), async (c) => {
  const id = c.req.param('id');
  const body = c.req.valid('json');
  const [updated] = await db.update(mission).set(body).where(eq(mission.id, id)).returning();
  return jsonOk(c, updated);
});

missionsRouter.post('/ingest', zValidator('json', ingestMissionSchema), async (c) => {
  const { rawText, sourceRef } = c.req.valid('json');
  const segments = rawText.split(/\n\n+/).filter(Boolean);
  const entries = segments.map((segment, index) => ({
    title: segment.split('\n')[0] ?? `Mission ${index + 1}`,
    context: segment,
    sourceRef
  }));
  const inserted = await db.insert(mission).values(entries).returning();
  return jsonOk(c, inserted);
});

missionsRouter.post('/:id/anonymize', zValidator('json', anonymizeMissionSchema), async (c) => {
  const id = c.req.param('id');
  const body = c.req.valid('json');
  const [row] = await db.select().from(mission).where(eq(mission.id, id));
  if (!row) {
    return c.json({ error: 'Mission not found' }, 404);
  }
  const { text, substitutions } = anonymizeText([row.context, row.actions, row.outcomes].filter(Boolean).join('\n\n'), body.rules);
  await db.update(mission).set({ context: text }).where(eq(mission.id, id));
  return jsonOk(c, { text, substitutions });
});
