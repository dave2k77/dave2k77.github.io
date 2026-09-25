import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseArticle, renderArticle } from '../src/articles.js';

test('an article has a stable page and escapes HTML from metadata and body', () => {
  const article = parseArticle(`---
title: 'Memory & <measurement>'
date: '2026-10-02'
category: Research
summary: 'A short introduction.'
draft: false
---
**Evidence** <script>alert(1)</script>`, 'memory-and-measurement');
  const html = renderArticle(article, 'assets/index-test.css');
  assert.match(html, /articles\/memory-and-measurement\//);
  assert.match(html, /<strong>Evidence<\/strong>/);
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>alert/);
  assert.match(html, /\.\.\/\.\.\/assets\/index-test\.css/);
});

test('article filenames and required metadata are validated', () => {
  assert.throws(() => parseArticle('---\ntitle: Test\n---\nBody', '../unsafe'), /Invalid article slug/);
  assert.throws(() => parseArticle('---\ntitle: Test\n---\nBody', 'test'), /date must be non-empty/);
});
