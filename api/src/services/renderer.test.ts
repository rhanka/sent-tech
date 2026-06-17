import { describe, it, expect } from 'vitest';
import { renderTemplate } from './renderer.js';

describe('renderTemplate', () => {
  it('injects mission and assets', () => {
    const html = renderTemplate({
      mission: { id: '1', title: 'Mission X', sector: 'Public' },
      services: [{ id: 'svc', title: 'Service' }],
      assets: [{ id: 'asset', title: 'Asset', type: 'summary', content: 'Contenu' }],
      template: { id: 'tmpl', name: 'Test', type: 'offer_html', content: '<h1>{{mission.title}}</h1>{{assets.list}}' }
    });
    expect(html).toContain('Mission X');
    expect(html).toContain('Asset');
  });
});
