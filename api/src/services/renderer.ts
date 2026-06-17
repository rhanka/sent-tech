import { missionSchema } from '../schemas/mission.js';
import { serviceSchema } from '../schemas/serviceCatalog.js';
import { assetSchema } from '../schemas/asset.js';

export type RenderPayload = {
  mission: unknown;
  services: unknown[];
  assets: unknown[];
  template: { id: string; name: string; type: string; content: string };
  locale?: string;
};

export const renderTemplate = (payload: RenderPayload): string => {
  const mission = missionSchema.parse(payload.mission);
  const services = payload.services.map((svc) => serviceSchema.parse(svc));
  const assets = payload.assets.map((asset) => assetSchema.parse(asset));
  const { content } = payload.template;

  return content
    .replaceAll('{{mission.title}}', mission.title)
    .replaceAll('{{mission.sector}}', mission.sector ?? '')
    .replaceAll('{{mission.role}}', mission.role ?? '')
    .replaceAll('{{mission.period}}', mission.period ?? '')
    .replaceAll('{{services.list}}', services.map((svc) => `- ${svc.title}`).join('\n'))
    .replaceAll('{{assets.list}}', assets.map((asset) => `### ${asset.title}\n${asset.content ?? ''}`).join('\n\n'));
};
