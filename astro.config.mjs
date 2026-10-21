// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Public address of the site. Change this when a custom domain is added (see public/CNAME).
  site: 'https://giubrune.github.io',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    // Pages without an Italian version are linked in English (see src/i18n/utils.ts).
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', it: 'it' } },
      // Temporary review pages stay out of the sitemap.
      filter: (page) => !page.includes('/design-preview/'),
    }),
  ],
});
