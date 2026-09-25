import { parse } from 'yaml';

const arrays = ['links', 'facts', 'projects', 'experience', 'education', 'writing', 'skills', 'downloads'];
const textFields = ['name', 'initials', 'credentials', 'role', 'location', 'affiliation', 'email', 'updated', 'description'];

export function safeUrl(value) {
  if (typeof value !== 'string') throw new Error('Link must be a string.');
  // Only explicit web/mail links and paths within this site are permitted.
  if (/^(https?:\/\/|mailto:)/i.test(value)) return value;
  if (/^(?:\.\/)?(?:cv|content)\/[\w./-]+$/.test(value) && !value.includes('..')) return value;
  throw new Error(`Unsupported link: ${value}`);
}

export function parseProfile(source) {
  const match = source.replace(/^\uFEFF/, '').match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)$/);
  if (!match) throw new Error('profile.md needs YAML metadata between two --- lines.');
  const data = parse(match[1], { maxAliasCount: 0 });
  if (!data || typeof data !== 'object') throw new Error('Profile metadata must be an object.');
  const string = (value, label) => {
    if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} must be non-empty text.`);
  };
  textFields.forEach(key => string(data[key], key));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.updated) || Number.isNaN(Date.parse(data.updated))) throw new Error('updated must be a quoted YYYY-MM-DD date.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new Error('email must be a valid email address.');
  arrays.forEach(key => { if (!Array.isArray(data[key])) throw new Error(`${key} must be a list.`); });
  const object = (value, fields, label) => {
    if (!value || typeof value !== 'object') throw new Error(`${label} must be an object.`);
    fields.forEach(key => string(value[key], `${label}.${key}`));
  };
  object(data.hero, ['eyebrow', 'heading', 'emphasis', 'summary', 'note'], 'hero');
  object(data.contact, ['heading', 'text'], 'contact');
  object(data.research, ['intro'], 'research');
  object(data.research.current, ['label', 'title', 'description', 'detail'], 'research.current');
  if (!Array.isArray(data.research.topics)) throw new Error('research.topics must be a list.');
  const rows = [
    [data.links, ['label', 'url'], 'links'],
    [data.facts, ['value', 'label'], 'facts'],
    [data.research.topics, ['title', 'label', 'description'], 'research.topics'],
    [data.projects, ['name', 'category', 'label', 'description', 'url'], 'projects'],
    [data.experience, ['role', 'organisation', 'location', 'dates', 'category', 'description'], 'experience'],
    [data.education, ['degree', 'institution', 'dates', 'detail'], 'education'],
    [data.writing, ['title', 'type', 'year', 'detail'], 'writing'],
    [data.skills, ['title'], 'skills'],
    [data.downloads, ['label', 'url'], 'downloads'],
  ];
  rows.forEach(([items, fields, label]) => items.forEach((item, i) => object(item, fields, `${label}[${i}]`)));
  [...data.research.topics, ...data.projects, ...data.skills].forEach(item => {
    const list = item.tags ?? item.items;
    if (!Array.isArray(list)) throw new Error(`${item.title || item.name} needs tags or items.`);
    list.forEach(value => string(value, 'Tag'));
  });
  data.projects.forEach(project => {
    if (!Array.isArray(project.links)) throw new Error(`${project.name}.links must be a list.`);
    project.links.forEach(link => object(link, ['label', 'url'], 'Project link'));
  });
  [...data.links, ...data.projects, ...data.projects.flatMap(p => p.links), ...data.writing, ...data.downloads]
    .forEach(item => { if (item.url !== undefined) safeUrl(item.url); });
  if (!match[2].trim()) throw new Error('Add your About text below the YAML metadata.');
  return { ...data, about: match[2].trim() };
}
