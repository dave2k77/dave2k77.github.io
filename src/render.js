import MarkdownIt from 'markdown-it';
import { safeUrl } from './content.js';

const md = new MarkdownIt({ html: false, linkify: false, typographer: true });
export const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
const e = escapeHtml;
const arrow = '<span aria-hidden="true">↗</span>';
const down = '<span aria-hidden="true">↓</span>';
const url = value => e(safeUrl(value));
const tags = values => `<ul class="tags" aria-label="Topics">${values.map(value => `<li>${e(value)}</li>`).join('')}</ul>`;
const externalLink = (link, className = '') => `<a class="${className}" href="${url(link.url)}">${e(link.label)} ${arrow}</a>`;
const title = (number, label, heading, aside = '') => `<div class="section-heading"><div><p class="eyebrow"><span>${number}</span> ${label}</p><h2>${heading}</h2></div>${aside}</div>`;

function signalArt() {
  const lines = Array.from({ length: 38 }, (_, row) => {
    const points = Array.from({ length: 121 }, (_, i) => {
      const x = 35 + i * 3.6;
      const t = i / 120;
      const envelope = Math.sin(t * Math.PI) ** 1.7;
      const wave = Math.sin(t * 10.6 + row * .135) * 43 + Math.cos(t * 18 - row * .09) * 17;
      return `${i ? 'L' : 'M'}${x.toFixed(2)},${(78 + row * 6.5 + wave * envelope).toFixed(2)}`;
    }).join(' ');
    return `<path d="${points}" stroke="${row % 8 === 0 ? '#b99362' : '#37665b'}" opacity="${(.35 + Math.sin(row / 38 * Math.PI) * .55).toFixed(2)}"/>`;
  }).join('');
  return `<figure class="signal-art" aria-label="Abstract illustration of layered, interacting waves"><div class="figure-top"><span>MEMORY / SCALE / STRUCTURE</span><span aria-hidden="true">[ 01 — ∞ ]</span></div><svg viewBox="0 0 500 395" fill="none" aria-hidden="true"><defs><pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#37665b" opacity=".17"/></pattern></defs><rect width="500" height="395" fill="url(#grid)"/><g stroke-width=".85">${lines}</g><path d="M35 357H468M35 353V361M468 353V361" stroke="#37665b" opacity=".3"/><text x="35" y="380" fill="#577268" font-size="10" font-family="monospace">t₀</text><text x="449" y="380" fill="#577268" font-size="10" font-family="monospace">tₙ</text></svg><figcaption><span>Patterns across scales</span><span>an illustrative study</span></figcaption></figure>`;
}

export function renderSite(data) {
  const categories = [...new Set(data.projects.map(project => project.category))];
  const navigation = [['about', 'About'], ['research', 'Research'], ['software', 'Software'], ['experience', 'Experience'], ['writing', 'Writing']];
  const downloads = data.downloads.map(link => externalLink(link, 'button button-secondary')).join('');
  return `
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="#top" aria-label="${e(data.name)} — home"><span class="monogram">${e(data.initials)}<span>·</span></span><span>${e(data.name)}</span></a>
      <button class="menu-toggle" aria-expanded="false" aria-controls="main-nav"><span>Menu</span><span class="menu-icon" aria-hidden="true">☰</span></button>
      <nav id="main-nav" aria-label="Main navigation">${navigation.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}<a class="nav-contact" href="#contact">Let’s talk ${arrow}</a></nav>
    </div>
  </header>
  <main id="main">
    <section class="hero container" id="top" aria-labelledby="hero-title">
      <div class="hero-copy"><p class="eyebrow">${e(data.hero.eyebrow)}</p><p class="hero-name">${e(data.name)} <span>${e(data.credentials)}</span></p><h1 id="hero-title">${e(data.hero.heading)}<br><em>${e(data.hero.emphasis)}</em></h1><p class="hero-summary">${e(data.hero.summary)}</p><div class="hero-actions"><a class="button button-primary" href="#research">Explore my work ${down}</a><a class="text-link" href="#experience">Curriculum vitae <span aria-hidden="true">→</span></a></div><p class="affiliation"><span aria-hidden="true"></span>${e(data.hero.note)}</p></div>
      ${signalArt()}
    </section>
    <div class="identity-strip"><div class="container identity-inner"><p>${e(data.role)}</p><span class="location"><svg width="15" height="18" viewBox="0 0 20 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M18 9c0 6-8 13-8 13S2 15 2 9a8 8 0 1 1 16 0Z"/><circle cx="10" cy="9" r="2.5"/></svg>${e(data.location)}</span></div></div>
    <section class="section container about-section" id="about" aria-labelledby="about-heading">
      <div class="about-label"><p class="eyebrow"><span>01</span> A LITTLE CONTEXT</p><h2 id="about-heading">Across disciplines.<br><em>Connected by curiosity.</em></h2><div class="social-links">${data.links.map(link => externalLink(link)).join('')}</div></div>
      <div class="about-content prose">${md.render(data.about)}<div class="facts">${data.facts.map(fact => `<div><strong>${e(fact.value)}</strong><span>${e(fact.label)}</span></div>`).join('')}</div></div>
    </section>
    <section class="research-wrap" id="research" aria-labelledby="research-heading"><div class="section container">
      ${title('02', 'RESEARCH', '<span id="research-heading">Finding structure in complexity.</span>')}
      <p class="section-intro">${e(data.research.intro)}</p>
      <div class="research-grid">${data.research.topics.map(topic => `<article class="research-topic"><p class="eyebrow">${e(topic.label)}</p><h3>${e(topic.title)}</h3><p>${e(topic.description)}</p>${tags(topic.tags)}</article>`).join('')}</div>
      <div class="current-research"><div><p class="eyebrow">${e(data.research.current.label)}</p><h3>${e(data.research.current.title)}</h3><p class="small">${e(data.research.current.detail)}</p></div><div class="prose">${md.render(data.research.current.description)}</div></div>
    </div></section>
    <section class="section container" id="software" aria-labelledby="software-heading">
      ${title('03', 'SELECTED SOFTWARE', '<span id="software-heading">Ideas, made reproducible.</span>', externalLink({ label: 'All repositories', url: data.links.find(link => link.label === 'GitHub')?.url || 'https://github.com' }, 'text-link'))}
      <div class="project-toolbar"><p>Open tools for research and learning.</p><div class="filters" role="group" aria-label="Filter projects"><button class="filter is-active" data-filter="All" aria-pressed="true">All work</button>${categories.map(category => `<button class="filter" data-filter="${e(category)}" aria-pressed="false">${e(category)}</button>`).join('')}</div></div>
      <p class="sr-only" id="filter-status" role="status" aria-live="polite"></p>
      <div class="project-grid">${data.projects.map((project, i) => `<article class="project-card" data-category="${e(project.category)}"><div class="project-top"><span class="project-symbol" aria-hidden="true">${['⌁', '∂', '∿', 'ƒ', '∇'][i % 5]}</span><span class="project-index">${String(i + 1).padStart(2, '0')}</span></div><p class="eyebrow">${e(project.label)}</p><h3><a href="${url(project.url)}">${e(project.name)} ${arrow}</a></h3><p class="project-description">${e(project.description)}</p>${tags(project.tags)}<div class="project-links">${externalLink({ label: 'Repository', url: project.url })}${project.links.map(link => externalLink(link)).join('')}</div></article>`).join('')}</div>
    </section>
    <section class="experience-wrap" id="experience" aria-labelledby="experience-heading"><div class="section container">
      ${title('04', 'CURRICULUM VITAE', '<span id="experience-heading">A path through research<br>and education.</span>', downloads ? `<div class="cv-downloads">${downloads}</div>` : '<a class="text-link" href="#education">Academic background <span aria-hidden="true">↓</span></a>')}
      <div class="career-layout"><aside class="career-note"><h3>Experience</h3><p>Mathematical foundations.<br>Computational practice.<br>Classroom perspective.</p><span class="eyebrow">${e(data.credentials)} · FELLOW OF THE IMA</span></aside><div class="timeline">${data.experience.map((entry, index) => `<article class="timeline-entry ${index < 2 ? 'current' : ''}"><div class="timeline-meta"><span>${e(entry.dates)}</span><span>${e(entry.category)}</span></div><h3>${e(entry.role)}</h3><p class="organisation">${e(entry.organisation)} <span>· ${e(entry.location)}</span></p><p>${e(entry.description)}</p></article>`).join('')}</div></div>
      <div class="education-layout" id="education"><div><p class="eyebrow">ACADEMIC BACKGROUND</p><h3>Always learning.</h3></div><div class="education-grid">${data.education.map(entry => `<article><p class="eyebrow">${e(entry.dates)}</p><h4>${e(entry.degree)}</h4><p class="institution">${e(entry.institution)}</p><p>${e(entry.detail)}</p></article>`).join('')}</div></div>
    </div></section>
    <section class="section container" id="writing" aria-labelledby="writing-heading">
      ${title('05', 'PUBLICATIONS & CONTRIBUTIONS', '<span id="writing-heading">Sharing the work.</span>', externalLink(data.links.find(link => link.label === 'ORCID') || { label: 'ORCID', url: 'https://orcid.org' }, 'text-link'))}
      <div class="writing-list">${data.writing.map(entry => `<article class="writing-entry"><span class="writing-year">${e(entry.year)}</span><div><p class="eyebrow">${e(entry.type)}</p><h3>${entry.url ? `<a href="${url(entry.url)}">${e(entry.title)} ${arrow}</a>` : e(entry.title)}</h3><p>${e(entry.detail)}</p></div></article>`).join('')}</div>
    </section>
    <section class="skills-wrap"><div class="section container"><p class="eyebrow">THE TOOLKIT</p><h2>From theory to practice.</h2><div class="skills-grid">${data.skills.map(skill => `<div><h3>${e(skill.title)}</h3>${tags(skill.items)}</div>`).join('')}</div></div></section>
    <section class="contact-section" id="contact" aria-labelledby="contact-heading"><div class="container"><p class="eyebrow">RESEARCH · SOFTWARE · EDUCATION</p><div class="contact-layout"><div><h2 id="contact-heading">${e(data.contact.heading)}</h2><p>${e(data.contact.text)}</p></div><a class="contact-email" href="mailto:${e(data.email)}"><span>Say hello</span><strong>${e(data.email)} ${arrow}</strong></a></div><div class="contact-links">${data.links.map(link => externalLink(link)).join('')}</div></div></section>
  </main>
  <footer class="container footer"><p>© ${e(data.updated.slice(0, 4))} ${e(data.name)}</p><p>Last updated ${new Date(`${data.updated}T12:00:00Z`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })}</p><a href="#top">Back to top <span aria-hidden="true">↑</span></a></footer>`;
}
