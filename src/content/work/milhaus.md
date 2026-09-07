---
title: Milhaus
tagline: A rental marketplace for Americans relocating to Germany
summary: >
  Half real-estate portal, half classifieds board — combining an on-base housing
  office feed with homes self-listed by families rotating out, and an admin
  dashboard simple enough for a non-technical owner to run alone.
category: Web app
audience: Military and expat families moving to or from German bases
year: 2025
status: Concept build
featured: true
order: 3
accent: '#c89b3c'
repoUrl: https://github.com/TerryL1971/Milhaus
cover: ./_assets/milhaus/cover.png
stack:
  - Next.js (App Router, TS)
  - Supabase (Postgres, auth, storage)
  - Tailwind CSS
  - Vercel
---

## The problem

A family arriving at a U.S. base in Germany has two bad options for finding a
home: a formal German property portal built for locals with local credit and
language, or a Facebook group where listings scroll away in hours. Meanwhile the
family they're replacing is trying to hand over a perfectly good house and can't
easily reach them.

The owner of this concept, Charlie, is non-technical and would be running the
listings himself — reviewing submissions, coordinating with the housing office.
So the constraint wasn't just "build a marketplace", it was "build one a
non-developer can operate solo, daily".

## What I built

- **A public browse experience** — listing grid with filter chips by city and
  base, availability status, and a signature dashed-circle **"stamp"** badge that
  marks a home as sourced from the on-base housing office versus self-listed by a
  PCS family. That trust distinction shows on both the card grid and the detail
  page.
- **A post-a-listing flow** for departing families — photos, price, move-out
  date — with new listings defaulting to `pending_review`.
- **An admin dashboard** built for Charlie: a queue of pending listings to
  approve or reject, one-click status changes to `rented` or `archived`, and a
  plain table of everything live.
- **SEO from day one** — a dynamic sitemap generated from active listings,
  per-listing meta tags, plus Sentry and Vercel Analytics wired in.

## Stack &amp; decisions

**Next.js App Router** with server components by default; `"use client"` only
where interaction demands it. **Supabase** provides Postgres, auth and photo
storage in one service. The listing engine is deliberately built around a generic
content type with an extensible `type` enum, so a second category (car ads was
discussed) could be added later without a rewrite — but that scope was explicitly
deferred until the rental MVP is validated. The visual design was implemented
from an approved static mockup and its design tokens rather than reinvented.
