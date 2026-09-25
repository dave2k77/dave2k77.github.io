# Articles

Add a Markdown file named `short-descriptive-slug.md`. The build creates a permanent page at `/articles/short-descriptive-slug/` and lists the post on the home page. Use this template:

```md
---
title: A clear article title
date: '2026-10-02'
category: Research
summary: A brief, plain-language description of the article.
draft: true
---

Write the article here in Markdown. Set `draft: false` when it is ready to publish.
```

Categories can cover research, STEM education, AI, scientific software, or video tutorials. Embed a video by linking to it in Markdown; the website does not currently host video files. Raw HTML is escaped. New posts are checked and built with `npm run build`, then published by pushing to `main`.
