# Personal Website · Pattabi Ram S

A fast, accessible portfolio site built with plain HTML, CSS, and JavaScript. No build step,
no dependencies, and no tracking. Deploys as-is to GitHub Pages.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Main page: hero, about, expertise, experience, projects, certifications, contact |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms and conditions |
| `styles.css` | Design tokens, layout, and components (single light theme) |
| `main.js` | Mobile menu toggle and footer year (progressive enhancement) |
| `favicon.svg` | Site icon |
| `headshot.jpg` | Profile photo |
| `Pattabi-Ram-S-Resume.pdf` | Downloadable résumé |

## Design principles

- One light theme with a single emerald accent. No purple gradients, no gradient text.
- Plain, factual copy. No invented metrics, reviews, or customer counters.
- SVG line icons, not emoji.
- No decorative scroll, cursor, or hover animation.
- Semantic HTML, skip link, visible focus states, and WCAG AA+ contrast.
- Responsive and mobile-first.

## Editing

All content is plain text in `index.html`. Colours are defined once at the top of
`styles.css` (`--accent` and friends).

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy (GitHub Pages)

Settings → Pages → Deploy from a branch → `main` → `/root`.
