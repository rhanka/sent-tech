import { pgTable, uuid, text, jsonb, integer, timestamp } from 'drizzle-orm/pg-core';

export const mission = pgTable('mission', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  sector: text('sector'),
  period: text('period'),
  role: text('role'),
  context: text('context'),
  actions: text('actions'),
  outcomes: text('outcomes'),
  techStack: jsonb('tech_stack').$type<string[]>(),
  confidentiality: text('confidentiality').default('normal'),
  sourceRef: text('source_ref'),
  createdAt: timestamp('created_at').defaultNow()
});

export const serviceCatalog = pgTable('service_catalog', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  summary: text('summary'),
  sectors: jsonb('sectors').$type<string[]>(),
  deliverables: jsonb('deliverables').$type<string[]>(),
  options: jsonb('options').$type<Array<{ id: string; label: string }>>(),
  effortMinJH: integer('effort_min_jh'),
  effortMaxJH: integer('effort_max_jh'),
  tags: jsonb('tags').$type<string[]>()
});

export const missionService = pgTable('mission_service', {
  id: uuid('id').primaryKey().defaultRandom(),
  missionId: uuid('mission_id').references(() => mission.id).notNull(),
  serviceId: text('service_id').references(() => serviceCatalog.id).notNull(),
  weight: integer('weight').default(1)
});

export const asset = pgTable('asset', {
  id: uuid('id').primaryKey().defaultRandom(),
  missionId: uuid('mission_id').references(() => mission.id),
  title: text('title').notNull(),
  type: text('type').notNull(),
  content: text('content'),
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at').defaultNow()
});

export const exportJob = pgTable('export_job', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: text('type').notNull(),
  payload: jsonb('payload').$type<Record<string, unknown>>().notNull(),
  status: text('status').default('pending'),
  resultUrl: text('result_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const template = pgTable('template', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type').notNull(),
  content: text('content').notNull(),
  locale: text('locale').default('fr')
});
