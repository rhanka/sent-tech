import { renderTemplate } from './renderer.js';
import type { RenderPayload } from './renderer.js';

type ExportResult = {
  content: string;
  mimeType: string;
  extension: string;
};

export const exportHtml = (payload: RenderPayload): ExportResult => ({
  content: renderTemplate(payload),
  mimeType: 'text/html',
  extension: 'html'
});

export const exportPdf = (payload: RenderPayload): ExportResult => ({
  content: renderTemplate(payload),
  mimeType: 'application/pdf',
  extension: 'pdf'
});

export const exportStub = (type: 'offer_docx' | 'offer_pptx'): ExportResult => ({
  content: JSON.stringify({ message: `Exporter pour ${type} en cours de développement` }, null, 2),
  mimeType: 'application/json',
  extension: 'json'
});

export const exportByType = (type: string, payload: RenderPayload): ExportResult => {
  switch (type) {
    case 'offer_html':
    case 'cv':
    case 'case_study':
      return exportHtml(payload);
    case 'offer_pdf':
      return exportPdf(payload);
    case 'offer_docx':
    case 'offer_pptx':
      return exportStub(type);
    default:
      throw new Error(`Type d'export inconnu: ${type}`);
  }
};
