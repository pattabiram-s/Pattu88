# Personal Website — Pattabi, Solutions Architect

A fast, accessible, single-page portfolio built with plain HTML, CSS, and JavaScript.
No build step, no dependencies — deploys as-is to GitHub Pages, Netlify, Cloudflare Pages, or any static host.

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Page content and structure (semantic HTML) |
| `styles.css` | Design tokens, layout, components, responsive rules |
| `main.js` | Theme toggle, scroll progress, reveal animations (progressive enhancement) |

## Design notes

- **Dark/light themes** via a `data-theme` attribute, persisted in `localStorage` and defaulting to the visitor's system preference.
- **Accessibility**: semantic landmarks, skip link, visible focus states, `prefers-reduced-motion` support, and WCAG AA+ contrast.
- **Performance**: no framework, system + Google fonts, CSS-driven animations, `IntersectionObserver` for reveals.
- **Responsive**: mobile-first, works from 320px up.

## Make it yours

Everything you'll want to change is plain text in `index.html`:

1. **Name** — replace `Pattabi` (nav brand, hero, footer).
2. **Headline & bio** — the `.hero` and `#about` sections.
3. **Expertise / Work / Experience** — edit the cards, projects, and timeline items.
4. **Contact links** — update the `mailto:`, GitHub, and LinkedIn URLs in `#contact`.
5. **Brand colors** — tweak `--accent`, `--accent-2`, `--accent-3` at the top of `styles.css`.

## Deploy to GitHub Pages

1. Push to your `main` (or default) branch.
2. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Choose the branch and `/root`. Your site publishes at `https://pattu88.github.io/pattu88/` (or your custom domain).

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
