import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseProfile, safeUrl } from '../src/content.js';
import { renderSite } from '../src/render.js';

const source = await readFile(new URL('../public/content/profile.md', import.meta.url), 'utf8');

test('Windows line endings and UTF-8 BOM preserve profile metadata and Markdown', () => {
  const profile = parseProfile('\uFEFF' + source.replace(/\r?\n/g, '\r\n'));
  assert.equal(profile.name, 'Davian R. Chin');
  assert.ok(profile.projects.length >= 3);
  assert.equal(profile.about, parseProfile(source).about);
});

test('malformed content fails before deployment with a useful message', () => {
  assert.throws(() => parseProfile('A profile with no front matter'), /YAML metadata/);
  assert.throws(() => parseProfile(source.replace('name: Davian R. Chin', 'name: null')), /name must be non-empty/);
  assert.throws(() => parseProfile(source.replace('projects:', 'projects: invalid\nunused_projects:')), /projects must be a list/);
});

test('unsafe URLs cannot be injected into structured links', () => {
  for (const link of ['javascript:alert(1)', 'data:text/html,hello', '//evil.example', 'cv/../private.pdf']) {
    assert.throws(() => safeUrl(link), /Unsupported link/);
  }
  assert.equal(safeUrl('cv/research.pdf'), 'cv/research.pdf');
  assert.equal(safeUrl('https://github.com/dave2k77'), 'https://github.com/dave2k77');
});

test('Markdown and metadata render safely, while legitimate formatting survives', () => {
  const profile = parseProfile(source);
  profile.name = '<img src=x onerror=alert(1)>';
  profile.about = '**Research** <script>alert(1)</script> [unsafe](javascript:alert(1))';
  const output = renderSite(profile);
  assert.ok(output.includes('<strong>Research</strong>'));
  assert.ok(output.includes('&lt;script&gt;'));
  assert.ok(!output.includes('<script>'));
  assert.ok(!output.includes('<img src=x'));
  assert.ok(!output.includes('href="javascript:'));
});

test('new metadata entries appear without changing the renderer', () => {
  const profile = parseProfile(source);
  profile.projects.push({ name: 'New work', category: 'Outreach', label: 'NEW', description: 'An added project.', tags: ['Python'], url: 'https://example.com', links: [] });
  const output = renderSite(profile);
  assert.ok(output.includes('data-filter="Outreach"'));
  assert.ok(output.includes('data-category="Outreach"'));
  assert.ok(output.includes('An added project.'));
});
