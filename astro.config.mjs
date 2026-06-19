import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
// import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://visa-itinerary.example.com', // Will be overridden by PUBLIC_SITE_URL env var

  integrations: [
    react(),
    sitemap(),
    // cloudflare(),
    mdx(),
  ],
  vite: {
    css: {
      postcss: './postcss.config.cjs',
    },
  },
});