import { db, serviceCatalog, template } from '../src/db/index.js';

const services = [
  {
    id: 'diagnostic-360',
    title: 'Diagnostic 360 TI/Data/IA',
    summary: 'Audit ciblé des enjeux + quick wins',
    sectors: ['Manufacturier', 'Public', 'Financier', 'Startup'],
    deliverables: ['Rapport priorisé', 'Roadmap 90j'],
    options: [{ id: 'sec', label: 'Accent sécurité/compliance' }],
    effortMinJH: 5,
    effortMaxJH: 12,
    tags: ['audit', 'roi']
  },
  {
    id: 'poc-genai',
    title: 'PoC IA Générative',
    summary: 'Prototype orienté valeur avec données non sensibles',
    sectors: ['Manufacturier', 'Public', 'Financier'],
    deliverables: ['Prototype', 'Éval ROI & risques'],
    options: [{ id: 'pii', label: 'Anonymisation avancée' }],
    effortMinJH: 8,
    effortMaxJH: 25,
    tags: ['genai', 'mlops']
  },
  {
    id: 'architecture-sprint',
    title: 'Architecture Sprint (EA/Solution/Infra)',
    summary: 'Cible, principes, backlog, coûts/risques',
    sectors: ['Manufacturier', 'Public', 'Financier'],
    deliverables: ['Vision cible', 'Principes', 'Backlog'],
    options: [{ id: 'oss', label: 'Orientation open source' }],
    effortMinJH: 6,
    effortMaxJH: 15,
    tags: ['architecture']
  }
];

const templates = [
  {
    id: 'offer-html-fr',
    name: 'Offre standard HTML',
    type: 'offer_html',
    content: `<h1>{{mission.title}}</h1>\n<p>Secteur : {{mission.sector}}</p>\n<h2>Services</h2>\n<p>{{services.list}}</p>\n<h2>Assets</h2>\n<p>{{assets.list}}</p>`
  },
  {
    id: 'case-study-fr',
    name: 'Étude de cas FR',
    type: 'case_study',
    content: `## {{mission.title}}\n{{assets.list}}`
  }
];

await db.insert(serviceCatalog).values(services).onConflictDoNothing();
await db.insert(template).values(templates).onConflictDoNothing();

console.log('Seed completed');
