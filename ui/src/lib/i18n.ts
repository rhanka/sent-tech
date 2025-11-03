import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('fr', () => Promise.resolve({
  home: {
    title: 'SENT-tech Offer Builder',
    subtitle: 'Ingestion de missions, anonymisation et génération d’offres.'
  },
  nav: {
    missions: 'Missions',
    services: 'Services',
    composer: 'Composer',
    exports: 'Exports',
    settings: 'Paramètres'
  }
}));

register('en', () => Promise.resolve({
  home: {
    title: 'SENT-tech Offer Builder',
    subtitle: 'Ingest missions, anonymise insights and build offers.'
  },
  nav: {
    missions: 'Missions',
    services: 'Services',
    composer: 'Composer',
    exports: 'Exports',
    settings: 'Settings'
  }
}));

void init({
  fallbackLocale: 'fr',
  initialLocale: getLocaleFromNavigator() ?? 'fr'
});
