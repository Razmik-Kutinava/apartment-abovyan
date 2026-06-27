import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site =
  process.env.SITE_URL?.replace(/\/$/, '') ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://garni10.abovyan.app');

export default defineConfig({
  site,
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
