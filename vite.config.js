import { defineConfig } from 'vite';
import { readFile } from 'node:fs/promises';
import { parseProfile } from './src/content.js';
import { escapeHtml, renderSite } from './src/render.js';
import { loadArticles } from './src/articles.js';

export default defineConfig({
  base: './',
  plugins: [{
    name: 'markdown-profile-snapshot',
    async transformIndexHtml(html) {
      const profile = parseProfile(await readFile(new URL('./public/content/profile.md', import.meta.url), 'utf8'));
      const articles = await loadArticles();
      return html
        .replace('<!--SITE_TITLE-->', escapeHtml(`${profile.name} — Researcher & Educator`))
        .replaceAll('__SITE_TITLE__', escapeHtml(`${profile.name} — Researcher & Educator`))
        .replaceAll('__SITE_DESCRIPTION__', escapeHtml(profile.description))
        .replace('<!--SITE_CONTENT-->', renderSite(profile, articles))
        .replace('<!--ARTICLE_DATA-->', `<script type="application/json" id="article-data">${JSON.stringify(articles.map(({ body, ...metadata }) => metadata)).replace(/</g, '\\u003c')}</script>`);
    },
    handleHotUpdate({ file, server }) {
      const path = file.replaceAll('\\', '/');
      if (path.endsWith('/public/content/profile.md') || path.includes('/content/articles/')) server.ws.send({ type: 'full-reload' });
    },
  }],
});
