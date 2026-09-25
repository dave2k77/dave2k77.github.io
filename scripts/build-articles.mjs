import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { loadArticles, renderArticle } from '../src/articles.js';

const assets = await readdir('dist/assets');
const cssFile = assets.find(file => /^index-.*\.css$/.test(file));
if (!cssFile) throw new Error('The Vite stylesheet was not found.');
for (const article of await loadArticles()) {
  const path = join('dist', 'articles', article.slug);
  await mkdir(path, { recursive: true });
  await writeFile(join(path, 'index.html'), renderArticle(article, `assets/${cssFile}`));
}
