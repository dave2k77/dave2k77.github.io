import './style.css';
import { parseProfile } from './content.js';
import { renderSite } from './render.js';

const site = document.querySelector('#site');
const publishedMarkup = site.innerHTML;
document.documentElement.classList.remove('no-js');
let observer;
function observeSections() {
  observer?.disconnect();
  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        document.querySelectorAll('#main-nav a').forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    }
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

site.addEventListener('click', event => {
  const menu = event.target.closest('.menu-toggle');
  if (menu) menu.setAttribute('aria-expanded', String(menu.getAttribute('aria-expanded') !== 'true'));
  if (event.target.closest('#main-nav a')) document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
  const filter = event.target.closest('[data-filter]');
  if (filter) {
    document.querySelectorAll('[data-filter]').forEach(button => {
      button.classList.toggle('is-active', button === filter);
      button.setAttribute('aria-pressed', String(button === filter));
    });
    let visible = 0;
    document.querySelectorAll('.project-card').forEach(card => {
      card.hidden = filter.dataset.filter !== 'All' && card.dataset.category !== filter.dataset.filter;
      if (!card.hidden) visible++;
    });
    document.querySelector('#filter-status').textContent = `${visible} ${filter.dataset.filter === 'All' ? '' : filter.dataset.filter.toLowerCase() + ' '}projects shown.`;
  }
});

document.addEventListener('keydown', event => {
  const menu = document.querySelector('.menu-toggle');
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});

async function refreshProfile() {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}content/profile.md`, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`Content request failed (${response.status}).`);
    const profile = parseProfile(await response.text());
    const markup = renderSite(profile);
    // Preserve focus and scroll when the pre-rendered version is already current.
    const template = document.createElement('template');
    template.innerHTML = markup;
    if (publishedMarkup !== template.innerHTML) {
      site.innerHTML = markup;
    }
    document.title = `${profile.name} — Researcher & Educator`;
    document.querySelector('meta[name="description"]').content = profile.description;
    document.querySelector('meta[property="og:title"]').content = document.title;
    document.querySelector('meta[property="og:description"]').content = profile.description;
    observeSections();
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant' });
  } catch (error) {
    // The built HTML remains usable if a network request or a later edit fails.
    console.warn('Using the published profile snapshot:', error.message);
    const notice = document.createElement('p');
    notice.className = 'content-notice';
    notice.setAttribute('role', 'status');
    notice.textContent = 'Showing the last published profile. Live updates are temporarily unavailable.';
    site.append(notice);
    observeSections();
  }
}

observeSections();
refreshProfile();
