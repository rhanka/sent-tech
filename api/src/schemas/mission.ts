import { z } from 'zod';

export const missionSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1),
  sector: z.string().optional(),
  period: z.string().optional(),
  role: z.string().optional(),
  context: z.string().optional(),
  actions: z.string().optional(),
  outcomes: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  confidentiality: z.string().optional(),
  sourceRef: z.string().optional()
});

export const ingestMissionSchema = z.object({
  rawText: z.string().min(10),
  sourceRef: z.string().default('CV_2024')
});

export const anonymizeMissionSchema = z.object({
  rules: z.array(z.object({
    pattern: z.string(),
    replacement: z.string()
  })).optional()
});
