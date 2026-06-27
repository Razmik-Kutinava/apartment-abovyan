import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://garni10.abovyan.app',
  i18n: {
    defaultLocale: 'hy',
    locales: ['hy', 'ru', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  redirects: {
    '/': '/hy/',
  },
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
