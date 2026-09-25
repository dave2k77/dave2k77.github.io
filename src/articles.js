import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'yaml';
import MarkdownIt from 'markdown-it';

const directory = new URL('../content/articles/', import.meta.url);
const md = new MarkdownIt({ html: false, linkify: false, typographer: true });
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

export function parseArticle(source, slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid article slug: ${slug}`);
  const match = source.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) throw new Error(`${slug}: add YAML front matter between --- lines.`);
  const data = parse(match[1], { maxAliasCount: 0 });
  if (!data || typeof data !== 'object') throw new Error(`${slug}: invalid metadata.`);
  for (const field of ['title', 'date', 'category', 'summary']) {
    if (typeof data[field] !== 'string' || !data[field].trim()) throw new Error(`${slug}: ${field} must be non-empty text.`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(data.date))) throw new Error(`${slug}: date must be quoted YYYY-MM-DD.`);
  if (data.draft !== undefined && typeof data.draft !== 'boolean') throw new Error(`${slug}: draft must be true or false.`);
  if (!match[2].trim()) throw new Error(`${slug}: article body is empty.`);
  return { slug, title: data.title, date: data.date, category: data.category, summary: data.summary, draft: data.draft === true, body: match[2].trim() };
}

export async function loadArticles() {
  const files = (await readdir(directory)).filter(file => file.endsWith('.md') && file !== 'README.md');
  const articles = await Promise.all(files.map(async file => parseArticle(await readFile(new URL(file, directory), 'utf8'), file.slice(0, -3))));
  return articles.filter(article => !article.draft).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function renderArticle(article, cssFile) {
  const title = `${article.title} — Davian R. Chin`;
  const href = `../../${cssFile}`;
  return `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title><meta name="description" content="${escape(article.summary)}">
<link rel="canonical" href="https://dave2k77.github.io/articles/${article.slug}/">
<link rel="icon" type="image/svg+xml" href="../../favicon.svg?v=2"><link rel="stylesheet" href="${escape(href)}"></head>
<body><a class="skip-link" href="#article">Skip to article</a><header class="site-header"><div class="container header-inner"><a class="brand" href="../../"><span class="monogram">DC<span>·</span></span><span>Davian R. Chin</span></a><a class="text-link" href="../../#articles">← All articles</a></div></header>
<main id="article" class="article-page container"><p class="eyebrow">${escape(article.category)} · <time datetime="${escape(article.date)}">${escape(new Date(`${article.date}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }))}</time></p>
<h1>${escape(article.title)}</h1><p class="article-deck">${escape(article.summary)}</p><div class="article-body prose">${md.render(article.body)}</div><a class="text-link article-back" href="../../#articles">← Back to articles</a></main>
<footer class="container footer"><p>© ${escape(article.date.slice(0,4))} Davian R. Chin</p><a href="../../">Home</a></footer></body></html>`;
}
