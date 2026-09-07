// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Update to the real production domain once DNS is moved. Sitemap and
  // canonical URLs are generated from this.
  site: 'https://terrell-lombardi.de',

  integrations: [react(), sitemap()],
  adapter: vercel(),

  // Every route is plain static HTML — fastest first paint, clean crawlability.
  output: 'static',

  // Canonical URLs without a trailing slash; keep the build output, the
  // sitemap, and the <link rel="canonical"> tags all in agreement.
  trailingSlash: 'never',
  build: { format: 'file' },

  // Warm each page's HTML on link hover/focus.
  prefetch: true,

  vite: {
    plugins: [tailwindcss()],
  },
});
