import { z } from 'zod';

export const assetSchema = z.object({
  id: z.string().uuid().optional(),
  missionId: z.string().uuid().optional(),
  title: z.string().min(1),
  type: z.string().min(1),
  content: z.string().optional(),
  metadata: z.record(z.unknown()).optional()
});

export const generateAssetsSchema = z.object({
  missionId: z.string().uuid(),
  options: z.record(z.unknown()).optional()
});
