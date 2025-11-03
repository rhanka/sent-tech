import { z } from 'zod';

export const serviceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().optional(),
  sectors: z.array(z.string()).optional(),
  deliverables: z.array(z.string()).optional(),
  options: z.array(z.object({ id: z.string(), label: z.string() })).optional(),
  effortMinJH: z.number().int().nonnegative().optional(),
  effortMaxJH: z.number().int().nonnegative().optional(),
  tags: z.array(z.string()).optional()
});

export const servicesSchema = z.array(serviceSchema);
