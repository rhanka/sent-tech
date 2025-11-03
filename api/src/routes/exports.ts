import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { db, exportJob, mission, serviceCatalog, asset as assetTable, template } from '../db/index.js';
import { createExportJobSchema } from '../schemas/exportJob.js';
import { jsonOk } from '../utils/http.js';
import { eq, inArray } from 'drizzle-orm';
import { exportByType } from '../services/exporter.js';

export const exportsRouter = new Hono();

exportsRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const [row] = await db.select().from(exportJob).where(eq(exportJob.id, id));
  if (!row) {
    return c.json({ error: 'Export not found' }, 404);
  }
  return jsonOk(c, row);
});

exportsRouter.post('/', zValidator('json', createExportJobSchema), async (c) => {
  const body = c.req.valid('json');
  const payload = body.payload as Record<string, unknown>;
  const missionId = payload.missionId as string | undefined;
  const assetIds = payload.assetIds as string[] | undefined;
  const serviceIds = payload.serviceIds as string[] | undefined;
  const templateId = payload.templateId as string | undefined;

  if (!missionId) {
    return c.json({ error: 'Mission id required' }, 400);
  }

  const [missionRow] = await db.select().from(mission).where(eq(mission.id, missionId));
  if (!missionRow) {
    return c.json({ error: 'Mission not found' }, 404);
  }

  const assets = assetIds && assetIds.length > 0 ? await db.select().from(assetTable).where(inArray(assetTable.id, assetIds)) : [];
  const services = serviceIds && serviceIds.length > 0 ? await db.select().from(serviceCatalog).where(inArray(serviceCatalog.id, serviceIds)) : [];
  const [templateRow] = templateId ? await db.select().from(template).where(eq(template.id, templateId)) : [undefined];
  if (!templateRow) {
    return c.json({ error: 'Template not found' }, 404);
  }

  const rendered = exportByType(body.type, {
    mission: missionRow,
    services,
    assets,
    template: templateRow
  });

  const [job] = await db.insert(exportJob).values({
    type: body.type,
    payload: body.payload,
    status: 'done',
    resultUrl: `data:${rendered.mimeType};base64,${Buffer.from(rendered.content).toString('base64')}`
  }).returning();

  return jsonOk(c, job);
});
