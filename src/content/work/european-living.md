---
title: European Living
tagline: A base-aware resource site for U.S. military families in Germany
summary: >
  Around 80 long-form guides, an English-speaking services directory, day-trip
  maps and a PCS timeline — filtered to the reader's base, and rebuilt from a
  slow React SPA into static HTML that search and answer engines can actually read.
category: Marketing site
audience: U.S. military families and American expats near German bases
year: 2025
status: Live
featured: true
order: 1
accent: '#7c5cbf'
liveUrl: https://www.european-living.live
repoUrl: https://github.com/TerryL1971/European-Living-Astro
cover: ./_assets/european-living/cover.png
stack:
  - Astro
  - React 19 islands
  - Tailwind CSS v4
  - Supabase (Postgres)
  - nanostores
  - Leaflet
  - Vercel
---

## The problem

Families posted to a U.S. installation in Germany land in a fog of logistics —
housing allowances, USAREUR driver's licences, SOFA status, finding a doctor who
speaks English, getting the kids into school. The information exists, but it's
scattered across forums and PDFs, and most of it doesn't say which of the seven
base regions it applies to.

The first version of the site was a client-rendered React single-page app. It
worked, but every route booted a blank page and then fetched its content — poor
first paint, and very little for Google or AI answer engines to index on a site
whose entire value is being *found* when someone searches "USAG Stuttgart
driver's license".

## What I built

A content platform covering **seven installation areas** — Stuttgart, Ramstein/KMC,
Wiesbaden, Grafenwöhr, Spangdahlem, Baumholder, and the wider Kaiserslautern
Military Community. The visitor picks their base once; the site then filters
services, day trips and guides to what's relevant to them, with that choice
shared across the page through a tiny nanostore.

- **~80 long-form articles** — city guides, PCS logistics, banking, healthcare,
  schooling — plus a phase-by-phase PCS moving timeline with key contacts and FAQ.
- **An English-speaking services directory** across nine categories, filterable
  by base, with Leaflet maps and reviews.
- **Curated day trips** within driving distance of each base, on an interactive map.
- **Community submission forms** so locals can add a business or a destination.
- **Client-gated admin pages** for data entry and featured-content management.

## Stack &amp; decisions

I migrated it to **Astro with `output: 'static'`** — every route is now
pre-rendered HTML. Content lives in **Supabase** and is fetched in two distinct
contexts: at build time (in Node, generating one HTML file per article, business,
day trip and destination) and, for the few things that change faster than the
deploy cadence, at runtime inside React islands.

React is kept only for the parts that genuinely need it — the header, base
selector, forms, filtered lists and maps — hydrated selectively with
`client:load`, `client:idle` or `client:visible`. SEO identity (meta tags and
`Organization` / `WebSite` JSON-LD) is driven from a single config file so the
`<head>` and the structured data can never drift apart.
