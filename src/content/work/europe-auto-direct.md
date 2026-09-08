---
title: Europe Auto Direct
tagline: Transparent, VAT-inclusive car buying for the international community
summary: >
  A concept brand site for relocating professionals buying their first car in a
  new country — where every price obeys one rule: the number you see is the
  number you pay. Real EN / DE / FR switching, a filterable inventory, static HTML.
category: Marketing site
audience: Expats and relocating professionals in Germany &amp; Luxembourg
year: 2025
status: Concept build
featured: true
order: 3
accent: '#00a3e0'
repoUrl: https://github.com/TerryL1971/Europe-Auto-Direct
cover: ./_assets/europe-auto-direct/cover.png
gallery:
  - ./_assets/europe-auto-direct/full-page.png
  - ./_assets/europe-auto-direct/german.png
stack:
  - Astro
  - React 19 islands
  - nanostores
  - Tailwind CSS v4
  - Vercel
---

## The problem

When you move countries, the car isn't the hard part — the paperwork, the
language and the local pricing conventions are. In Germany, advertised car prices
often bury VAT, quote net figures to trade buyers, or assume you have a local
credit history. For someone three weeks into a relocation, that's a minefield.

## What I built

A concept pitch site for a car-buying brand aimed squarely at that person. One
rule governs the whole design:

> The number you see is the number you pay.

- **VAT itemised on every card** — base price `+` VAT `=` total, broken out into
  its own chip, satisfying Germany's *Preisangabenverordnung* and making the
  entire value proposition visual.
- **EU-spec vehicles only** — no imports, no single-vehicle approval, no
  grey-market surprises.
- **A filterable inventory** of twelve mock listings — filter by make and body
  type, instant, no page reload.
- **Guidance, not gatekeeping** — no German credit history required; help through
  registration, insurance and TÜV.

## Stack &amp; decisions

Built with **Astro** shipping static HTML for the marketing content, with only
four **React islands** hydrating (inventory grid, filters, language toggle,
contact form).

The piece most concept sites fake is the language switch. Here **EN / DE / FR**
actually works: one dictionary and one nanostore atom (mirrored to
`localStorage`) drive both the static markup — which opts in with a
`data-i18n="key"` attribute — and the React islands, which read the same keys
through a `t(lang, key)` helper. The chrome, every heading, the filters, the CTAs
and the price labels all follow the switch from a single source.
