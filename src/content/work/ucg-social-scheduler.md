---
title: UCG Social Scheduler
tagline: A social-media scheduling tool with offline support
summary: >
  Draft, queue and schedule posts across accounts from one dashboard — a
  full-auth Next.js app with password reset, a PWA install path, and an
  API-proxy layer, built as an internal tool for a dealership's marketing.
category: Web app
audience: Small-business and dealership marketing teams
year: 2025
status: Live
order: 6
accent: '#2563eb'
liveUrl: https://ucg-social-scheduler.vercel.app
repoUrl: https://github.com/TerryL1971/UCG-Social-Scheduler
cover: ./_assets/ucg-social-scheduler/cover.png
stack:
  - Next.js (App Router)
  - TypeScript
  - Tailwind CSS
  - PWA (service worker)
  - Vercel
---

## The problem

A small marketing team posting to several social accounts by hand loses the
thread — nothing is planned, posting is reactive, and there's no shared view of
what's going out when. Off-the-shelf schedulers are priced for agencies and
bring features a two-person team will never touch.

## What I built

A focused scheduling dashboard: compose a post once, attach it to one or more
connected accounts, and drop it into a queue or a specific slot. Built as a real
application, not a prototype:

- **Full auth** — register, log in, forgot-password and reset-password flows.
- **A dashboard** as the home surface once signed in.
- **PWA install** — a service worker and registration path so it can be added to
  a phone home screen and survive a flaky connection.
- **An API proxy layer** (`app/proxy.ts`, `app/api/*`) so third-party calls and
  secrets stay server-side.

## Stack &amp; decisions

**Next.js App Router** with TypeScript and Tailwind. Server components handle the
authenticated shell; client components cover the compose-and-schedule
interactions. The proxy route keeps every outbound integration call and its
credentials off the client. Deployed on Vercel.
