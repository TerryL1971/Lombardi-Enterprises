---
title: Fieldstone
tagline: A home-goods storefront on a real freelance stack
summary: >
  A minimalist shop built on Next.js + Sanity CMS + Stripe Checkout — the exact
  stack a small retailer actually needs: a non-technical owner editing products
  in a friendly UI, and prices that can't be tampered with client-side.
category: E-commerce
audience: Small independent retailers
year: 2025
status: Concept build
order: 7
accent: '#5b7a5b'
repoUrl: https://github.com/TerryL1971/Fieldstone
cover: ./_assets/fieldstone/cover.png
stack:
  - Next.js 16 (App Router)
  - Sanity v6 (headless CMS)
  - Stripe Checkout (test mode)
  - Zustand
  - Tailwind CSS v4
  - Vercel
---

## The problem

Most small-shop website pitches fall down in the same place: the owner can't
update their own products without calling the developer, and the "cart" is a toy
that trusts whatever price the browser sends. A real storefront has to solve
content editing *and* payment integrity, or it isn't one.

## What I built

A complete minimalist storefront — home, shop grid with category filter and
search, product detail with variants, cart, and Stripe-powered checkout with
success and cancel states.

- **Content is CMS-managed.** Sanity Studio is embedded at `/studio`; the owner
  creates categories and products through a friendly UI. The moment one real
  product exists, the app bypasses its built-in placeholder catalog
  automatically.
- **It runs before it's configured.** With no environment variables, the shop
  renders a placeholder catalog with checkout disabled and a banner explaining
  the state — so the project is demoable from `npm install` alone.
- **Fresh on edit.** Catalog data is cache-tagged and revalidated by a Sanity
  webhook; without the webhook, time-based ISR still refreshes within ~60s.

## Stack &amp; decisions

**Next.js 16** (App Router, SSG + ISR), **Sanity** as the headless CMS, **Stripe
Checkout** in test mode, **Zustand** for a `localStorage`-persisted cart.

The pricing-trust problem is solved on the server: the browser cart is
display-only, and the checkout route re-reads every line item's price from the
catalog before building the Stripe session, so a tampered client payload can't
change what's charged. The app refuses to start with a live Stripe key — a demo
must never take real money.
