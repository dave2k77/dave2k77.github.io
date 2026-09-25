import { readFile, access } from 'node:fs/promises';
import { parseProfile } from '../src/content.js';

try {
  const profile = parseProfile(await readFile(new URL('../public/content/profile.md', import.meta.url), 'utf8'));
  for (const download of profile.downloads) {
    if (!/^https?:/.test(download.url)) await access(new URL(`../public/${download.url}`, import.meta.url));
  }
  console.log(`Content validated: ${profile.name}; ${profile.projects.length} projects, ${profile.experience.length} roles.`);
} catch (error) {
  console.error(`Content validation failed: ${error.message}`);
  process.exitCode = 1;
}
