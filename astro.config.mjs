import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

export default defineConfig({
  // Your live URL. Set PUBLIC_SITE_URL in .env (and in GitHub → Settings → Variables).
  site: env.PUBLIC_SITE_URL || 'https://ansariautomates.web.app/',
  trailingSlash: 'never',
  build: { format: 'file' }, // /projects/x.html, served as /projects/x by Firebase cleanUrls
  prefetch: { defaultStrategy: 'hover' },
  integrations: [
    react(),
    sitemap({ filter: (page) => !page.includes('/404') }),
  ],
});
