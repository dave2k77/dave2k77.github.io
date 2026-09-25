# Davian Chin — personal website

Website: [dave2k77.github.io](https://dave2k77.github.io/) · Repository: [dave2k77/dave2k77.github.io](https://github.com/dave2k77/dave2k77.github.io)

A responsive academic website built with Vite, plain JavaScript, and CSS. The content source is [`public/content/profile.md`](public/content/profile.md): YAML metadata for structured entries followed by Markdown for the About section.

## Run locally

Use Node.js 24 (or Node 22.12+).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (normally http://127.0.0.1:5173). Do not open `index.html` directly: fetching the Markdown requires an HTTP server.

```sh
npm test
npm run build
npx playwright install chromium
npm run test:browser
npm run preview
```

`npm run build` validates content and produces `dist/`. Browser checks cover mobile navigation, filtering, runtime Markdown updates, content failure, no-JavaScript rendering, PDF links, and WCAG A/AA accessibility scans. Screenshots are saved under `tmp/`.

## Edit content

1. Edit `public/content/profile.md`. Keep the two `---` delimiters.
2. Update the quoted `updated` date when you revise the content.
3. Preview with `npm run dev`, then run `npm run build` to validate it.
4. Commit and push to deploy the changes.

The file contains profile/contact details, links, hero text, research themes, projects, experience, education, writing, skills, and CV download links. Service offerings live in [`src/services.js`](src/services.js). Project filters are derived from the `category` fields. Add entries by copying an existing entry; use spaces rather than tabs in YAML. Quote strings containing a colon followed by a space. Optional publication URLs may be omitted; project `links` may be an empty list (`[]`).

## Publish an article

Create a Markdown file in `content/articles/`, following the template in [`content/articles/README.md`](content/articles/README.md). Drafts are excluded when `draft: true`. Set `draft: false`, run `npm run build`, and push to `main` to publish. The build adds an article card to the home page and creates its static page at `/articles/YOUR-SLUG/`. The page and index work without JavaScript. Use a stable filename because its slug forms the public URL. Link to videos rather than storing large video files in this repository.

The Markdown body supports ordinary paragraphs, emphasis, lists, and links. Embedded raw HTML is escaped and unsafe Markdown links are rejected. Structured metadata links accept HTTP(S), mail links, and relative files under `cv/` or `content/`.

The browser fetches the Markdown on every page load with revalidation. The build also renders a complete HTML snapshot and page metadata from the same file, so the profile remains readable without JavaScript or if the content request fails. Changes in the Vite dev server trigger a reload. Hosted edits become public after committing and deploying; the site cannot read files from a visitor's computer.

Layout, navigation labels, and other interface copy live in `src/render.js`; styling lives in `src/style.css`. The hero is an original decorative SVG illustration, not scientific data. Google Fonts are optional network resources; system fonts provide fallbacks.

## Deploy to GitHub Pages

1. Create a repository. Use `dave2k77.github.io` for the root website (`https://dave2k77.github.io/`), or another name for a project website (`https://dave2k77.github.io/REPOSITORY/`).
2. Initialise Git in this folder, commit the project, connect that repository, and push a `main` branch.
3. In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions**.
4. The included `.github/workflows/pages.yml` validates, tests, builds, and deploys pushes to `main`. Pull requests run the checks without deploying. You can also run the workflow manually.

Relative asset and Markdown URLs support both the root domain and repository subpaths. Only `dist/` is deployed. No API token, database, or backend is needed at runtime. GitHub information is curated into the local Markdown, not fetched from the GitHub API.

References: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Vite static deployment](https://vite.dev/guide/static-deploy.html).

## CV downloads and source documents

The supplied `Davian_Chin_CV_Research.tex` and `Davian_Chin_CV_Teaching.tex` remain the authoritative sources for the downloadable documents. Their compiled PDFs are in `public/cv/`. The teaching CV has one pagination adjustment to keep its technical-skills paragraph together. Revise the `.tex` source, compile again, visually check the PDFs, and commit both sources and PDFs:

```sh
tectonic --outdir public/cv Davian_Chin_CV_Research.tex
tectonic --outdir public/cv Davian_Chin_CV_Teaching.tex
```

The build does not automatically compile LaTeX or synchronise the website with the CVs: website edits belong in Markdown, and document edits belong in LaTeX. PDF rendering for review is available with `python scripts/inspect-pdfs.py` when PyMuPDF is installed.

The LinkedIn export is an input only, ignored by Git and excluded from the site. Original CV PDFs include the contact details present in the supplied sources. Review those PDFs as part of publication review.

## Content provenance

Initial website content was curated from the supplied research and teaching CVs, the LinkedIn export, and the public repositories below on 25 September 2026:

- [GitHub profile](https://github.com/dave2k77)
- [lrdbench](https://github.com/dave2k77/lrdbench)
- [hpfracc](https://github.com/dave2k77/hpfracc)
- [Fourier PINO](https://github.com/dave2k77/fourier_pino_model)
- [Differentiable and probabilistic programming curriculum](https://github.com/dave2k77/differentiable-probabilistic-programming-curriculum)

Published work, conference contributions, and manuscripts in development are labelled separately. Version numbers and GitHub activity counts are deliberately omitted from the website to avoid stale metadata. The research CV's `lrdbench` version predates the public repository; the original document has been preserved. The website uses United Kingdom as the location, as confirmed by Davian.
