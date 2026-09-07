---
title: Lombardi Photography
tagline: A photographer's portfolio and print shop
summary: >
  A filterable gallery with an overlay lightbox, and e-commerce logic applied to
  a non-standard product — ordering a print of a specific photo with size and
  finish variants, a persistent cart, and a mock checkout. Built in Nuxt / Vue.
category: E-commerce
audience: Photographers and visual artists selling prints
year: 2025
status: Concept build
order: 9
accent: '#3f4a5a'
cover: ./_assets/lombardi-photography/cover.png
stack:
  - Nuxt 4 (Vue 3)
  - Pinia
  - VueUse
  - "@nuxt/image"
  - Tailwind CSS
  - Vercel
---

## The problem

Selling prints is e-commerce with an awkward product: the thing being bought
isn't a SKU on a shelf, it's *this photograph* at *that size* with *this finish*,
and the price moves with those choices. The gallery also has to feel like a
gallery — fast, immersive, keyboard-navigable — not a product grid.

> A portfolio piece, not a live client build. All photographs are Terry
> Lombardi's own travel work — Heidelberg, Lucerne, Strasbourg, London,
> Keukenhof. The shop is a functional mock; no payment is processed.

## What I built

- **Gallery and lightbox.** A filterable masonry grid and an overlay lightbox
  (not a route) with keyboard navigation, scroll-lock, focus handling and native
  `<Transition>` crossfades.
- **E-commerce on a non-standard product.** Ordering a print with size × finish
  variants and a live-updating price; a cart with quantities and `localStorage`
  persistence; a mock checkout with validation and an order confirmation.
- **Responsive imagery** via `@nuxt/image` — WebP, lazy loading, and Vercel's
  image optimizer on deploy.

## Stack &amp; decisions

**Nuxt 4** (Vue 3, Composition API, `<script setup>`), **Pinia** for the cart,
**VueUse** for the lightbox mechanics. Animation is Vue's built-in `<Transition>`
rather than a motion library. The print-selection logic is extracted into a
`usePrintOrder()` composable shared by both the slide-in order panel and the
inline detail-page form — one source of truth for a flow that appears in two
places.
