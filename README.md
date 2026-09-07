# Lombardi Enterprises

The studio portfolio of Terry Lombardi — a developer and 20-year business
operator building fast, modern websites and apps, with a focus on expat-,
relocation-, and U.S. military-facing businesses in Germany.

**Portfolio-only for now.** No pricing, no "hire me", no booking funnel — the
site leads with the work and a light overview of what I do. The commercial layer
comes once the business is formally registered.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | [Astro 7](https://astro.build) — `output: 'static'`, every route pre-rendered HTML |
| Islands | [React 19](https://react.dev) — theme toggle, scroll-reveal observer, contact form only |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`, tokens in `src/styles/global.css` |
| Type | Inter Variable + Fraunces Variable (self-hosted via Fontsource) |
| Content | Astro content collection — one Markdown file per project in `src/content/work/` |
| SEO | Canonical + OG + Twitter + JSON-LD from `src/lib/site.ts`; `@astrojs/sitemap` |
| Deploy | [Vercel](https://vercel.com) via `@astrojs/vercel` |

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/ and .vercel/output/
npm run preview    # serve the build locally
```

## Project structure

```
src/
  components/       Header, Footer, Hero, WorkGrid, WorkCard, Approach, About,
                    Contact  (+ ThemeToggle.tsx, Reveal.tsx, ContactForm.tsx islands)
  content/
    work/          one .md per project — frontmatter drives the cards + case pages
    work/_assets/  co-located screenshots (cover.png per slug, optional gallery)
  layouts/BaseLayout.astro   <head>, meta, JSON-LD, no-flash theme script
  lib/site.ts      single source of truth for site identity + nav
  pages/
    index.astro           Hero → Work → Approach → About → Contact
    work/[slug].astro      case study, generated from the work collection
    404.astro
  styles/global.css        Tailwind v4 @theme tokens, dark mode, .reveal
scripts/
  gen-assets.mjs     regenerate favicon.ico + og-default.png
  shoot.mjs          screenshot the local build / live project sites (system Chrome)
  shoot-local.mjs    boot each concept project's dev server and screenshot it
```

## Adding or updating a project

Create `src/content/work/<slug>.md` with the frontmatter fields (see any existing
file). Drop a screenshot at `src/content/work/_assets/<slug>/cover.png` and
reference it as `cover: ./_assets/<slug>/cover.png` — without a cover, the card
renders a branded gradient using the `accent` colour, which is a fine fallback.

## Contact form

The form posts to Formspree. Set `PUBLIC_FORMSPREE_ID` (see `.env.example`) here
and in Vercel. With no ID set, the contact section degrades to a `mailto:` link.

---

## Setup still owed by Terry

- [ ] Create the GitHub repo `TerryL1971/Lombardi-Enterprises` and push.
- [ ] Create the Vercel project from the repo (framework auto-detected, no env
      needed to build).
- [ ] Point `terrell-lombardi.de` DNS at Vercel; update `site` in
      `astro.config.mjs` if the domain changes.
- [ ] Set up `hello@terrell-lombardi.de` (forwarding is fine) and a Formspree
      form; add `PUBLIC_FORMSPREE_ID` to Vercel.
- [ ] Provide the live URL for **UCG Social Scheduler** — add it as `liveUrl` in
      `src/content/work/ucg-social-scheduler.md` and re-run
      `node scripts/shoot.mjs covers` (add the slug to the `targets` map) for a
      real cover.
- [ ] Push **Lombardi Photography** to GitHub and add its `repoUrl`, or leave the
      code link off.
- [ ] Before taking on paid work: add an Impressum page (German legal
      requirement — needs the registered business name and tax details).
