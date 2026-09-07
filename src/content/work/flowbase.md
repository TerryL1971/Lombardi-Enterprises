---
title: Flowbase
tagline: A SaaS marketing site built on framework-native reactivity
summary: >
  A fictional B2B product's landing page — reactive pricing, transitioned feature
  tabs, an inline-validated demo form — built in SvelteKit with zero state or
  animation libraries, to show a third framework alongside Astro, Next and Nuxt.
category: Marketing site
audience: B2B / SaaS companies
year: 2025
status: Concept build
order: 8
accent: '#ff5a1f'
repoUrl: https://github.com/TerryL1971/Flowbase
cover: ./_assets/flowbase/cover.png
gallery:
  - ./_assets/flowbase/pricing.png
  - ./_assets/flowbase/features.png
stack:
  - SvelteKit
  - Svelte 5 (runes)
  - TypeScript
  - Tailwind CSS v4
  - Vercel
---

## The problem

SaaS marketing sites live on a handful of stateful interactions — a billing
toggle, feature tabs, a validated form. In a React build those usually mean a
state library plus an animation library. The question this piece answers: what
does that same site look like when the framework already does both?

> Flowbase is a fictional product — no real company, customers or backend. Every
> logo is a generic shape and every testimonial is an original placeholder.

## What I built

A single-page marketing site for an invented project-management tool, with three
interactions that are all **framework-native** — `$state`, `$derived` and
`svelte/transition`, no libraries:

- **Reactive pricing.** A monthly ⇄ annual switch; all three tier prices
  recompute the instant it flips. One `$state` boolean, zero flicker, no effect
  wiring.
- **Transitioned feature tabs.** Click a capability and the detail panel swaps
  with a `fly`/`fade`. Both panels share one grid cell so the crossfade never
  shifts the layout — no height jump mid-transition.
- **Inline-validated demo form.** Required-field and email-format checks derived
  straight from form state, gated on blur and submit, ending in a mock success
  screen.

## Stack &amp; decisions

**SvelteKit** with **Svelte 5 runes** and TypeScript. This was portfolio "site
four" — the piece that adds a third framework to a set that already had Astro,
Next and Nuxt. SaaS landing pages are a good showcase for Svelte specifically:
the interactive bits are exactly where its built-in reactivity and transitions
replace what would otherwise be Context/Zustand plus Framer Motion.
