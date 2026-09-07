---
title: Settled
tagline: 'A landing page for a concept relocation service — "Feel at home, faster."'
summary: >
  A single-page marketing site for a concept relocation and everyday-life support
  service for international families in Germany. An SEO/AEO-first Astro build with
  a warm terracotta-and-sand identity and React only where it earns its place.
category: Marketing site
audience: Expats and international families settling in Germany
year: 2025
status: Concept build
order: 4
accent: '#c8613f'
repoUrl: https://github.com/TerryL1971/Settled-Landing-Page
cover: ./_assets/settled/cover.png
stack:
  - Astro 7
  - React (islands)
  - Tailwind CSS v4
  - Framer Motion
  - Vercel
---

## The problem

Relocation-support services sell trust and calm. A landing page for one needs to
feel warm and human, load instantly on a phone on hotel wifi, and — because this
is how people find these services — be legible to search engines and AI answer
engines from the raw HTML.

## What I built

A single-page site for **Settled**, a concept service handling the errands of a
new life abroad — registrations, appointments, everyday logistics. The visual
identity is deliberately un-corporate: terracotta, sand and sage on a warm
off-white, with an editorial type system.

Sections: hero, a grid of support offerings, testimonials, an about section, and
a contact form — with a scroll-reveal treatment tying the scroll experience
together.

## Stack &amp; decisions

**Astro 7 with static output** and zero unnecessary client JavaScript. **React is
hydrated in exactly two places**: the Framer Motion scroll-reveal wrapper and the
contact form. Everything else — every heading, card and section — is
server-rendered HTML.

Tailwind CSS v4 with CSS-first `@theme` tokens keeps the whole palette and type
scale in one file. The `<head>` — canonical URL, Open Graph, Twitter card — is
centralised in the base layout and generated from the site's configured domain,
so the sitemap and canonical tags stay in sync. This is the kind of build where
the Lighthouse report *is* the sales pitch.
