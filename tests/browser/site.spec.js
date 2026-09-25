import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';

test('desktop: content, filters, downloads, accessibility and screenshot', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Understanding complexity');
  await page.getByRole('button', { name: 'Teaching', exact: true }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(2);
  await expect(page.locator('#filter-status')).toContainText('2 teaching projects');
  await page.getByRole('button', { name: 'All work', exact: true }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(5);
  for (const href of await page.locator('a[href^="cv/"]').evaluateAll(links => links.map(link => link.getAttribute('href')))) {
    const response = await page.request.get(href);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('pdf');
  }
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
  expect(errors).toEqual([]);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: 'tmp/site-desktop-hero.png' });
  await page.screenshot({ path: 'tmp/site-desktop.png', fullPage: true });
});

test('mobile: menu, keyboard dismissal and no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu' });
  await expect(page.getByRole('navigation')).toBeHidden();
  await menu.click();
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(page.getByRole('navigation')).toBeHidden();
  await menu.click();
  await page.getByRole('navigation').getByRole('link', { name: 'Research', exact: true }).click();
  await expect(page.getByRole('navigation')).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
  await page.goto('/');
  await page.screenshot({ path: 'tmp/site-mobile-hero.png' });
  await page.screenshot({ path: 'tmp/site-mobile.png', fullPage: true });
});

test('runtime content really comes from the local Markdown file', async ({ page }) => {
  const source = await readFile('public/content/profile.md', 'utf8');
  await page.route('**/content/profile.md', route => route.fulfill({ contentType: 'text/markdown', body: source.replace('Understanding complexity.', 'A live Markdown update.') }));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('A live Markdown update.');
});

test('failed or invalid Markdown preserves the usable published snapshot', async ({ page }) => {
  await page.route('**/content/profile.md', route => route.fulfill({ body: 'invalid metadata' }));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Understanding complexity');
  await expect(page.locator('.content-notice')).toBeVisible();
});

test('profile is readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Understanding complexity');
  await expect(page.getByRole('heading', { name: 'lrdbench' })).toBeVisible();
  await context.close();
});

test('GitHub Pages repository subpaths resolve assets and Markdown correctly', async ({ page }) => {
  const requests = [];
  await page.route('**/portfolio/**', async route => {
    requests.push(route.request().url());
    const response = await page.request.get(route.request().url().replace('/portfolio/', '/'));
    await route.fulfill({ response });
  });
  await page.goto('/portfolio/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Understanding complexity');
  await page.getByRole('button', { name: 'Research', exact: true }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(3);
  expect(requests.some(url => url.endsWith('/portfolio/content/profile.md'))).toBe(true);
  expect(requests.some(url => url.includes('/portfolio/assets/'))).toBe(true);
  await expect(page.locator('.content-notice')).toHaveCount(0);
});
