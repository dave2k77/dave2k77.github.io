import { defineConfig } from 'vite';
import { readFile } from 'node:fs/promises';
import { parseProfile } from './src/content.js';
import { escapeHtml, renderSite } from './src/render.js';

export default defineConfig({
  base: './',
  plugins: [{
    name: 'markdown-profile-snapshot',
    async transformIndexHtml(html) {
      const profile = parseProfile(await readFile(new URL('./public/content/profile.md', import.meta.url), 'utf8'));
      return html
        .replace('<!--SITE_TITLE-->', escapeHtml(`${profile.name} — Researcher & Educator`))
        .replaceAll('__SITE_TITLE__', escapeHtml(`${profile.name} — Researcher & Educator`))
        .replaceAll('__SITE_DESCRIPTION__', escapeHtml(profile.description))
        .replace('<!--SITE_CONTENT-->', renderSite(profile));
    },
    handleHotUpdate({ file, server }) {
      if (file.replaceAll('\\', '/').endsWith('/public/content/profile.md')) server.ws.send({ type: 'full-reload' });
    },
  }],
});
