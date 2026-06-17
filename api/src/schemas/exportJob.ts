import { z } from 'zod';

export const exportJobSchema = z.object({
  id: z.string().uuid().optional(),
  type: z.enum(['cv', 'case_study', 'offer_html', 'offer_pdf', 'offer_docx', 'offer_pptx']),
  payload: z.record(z.unknown()),
  status: z.enum(['pending', 'processing', 'done', 'error']).optional(),
  resultUrl: z.string().url().optional()
});

export const createExportJobSchema = exportJobSchema.omit({ id: true, status: true, resultUrl: true });
