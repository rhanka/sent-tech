import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { mission } from '../api/src/db/schema.js';

const missionInputSchema = z.object({
  title: z.string(),
  context: z.string(),
  sector: z.string().optional(),
  period: z.string().optional(),
  role: z.string().optional(),
  actions: z.string().optional(),
  outcomes: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  sourceRef: z.string()
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cvPath = process.argv[2] ?? path.resolve(__dirname, '../data/cv.txt');
const sourceRef = process.argv[3] ?? 'CV_2024_FR';
const databaseUrl = process.env.DATABASE_URL ?? 'postgres://senttech:senttech@localhost:5432/senttech';

const raw = readFileSync(cvPath, 'utf-8');
const segments = raw.split(/\n{2,}/).filter(Boolean);

const pool = new Pool({ connectionString: databaseUrl });
const db = drizzle(pool);

const rows = segments.map((segment) => {
  const [titleLine, ...rest] = segment.split('\n');
  const details = rest.join('\n');
  return missionInputSchema.parse({
    title: titleLine.trim() || 'Mission sans titre',
    context: details.trim(),
    techStack: [],
    sourceRef
  });
});

const main = async () => {
  await db.insert(mission).values(rows);
  console.log(`Ingestion de ${rows.length} missions effectuée`);
  await pool.end();
};

void main();
