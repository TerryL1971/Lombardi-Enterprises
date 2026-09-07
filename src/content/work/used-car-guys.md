---
title: Used Car Guys
tagline: A mobile app for a dealership serving U.S. military in Germany
summary: >
  Browse the lot, get matched with a specialist, and track a deal from
  application to pickup — a full Expo / React Native flow in the real brand,
  reading live inventory off the dealership's public site.
category: Mobile app
audience: U.S. service members stationed in Germany buying a car
year: 2025
status: Concept build
order: 5
accent: '#c8102e'
repoUrl: https://github.com/TerryL1971/UCG-App
stack:
  - Expo / React Native
  - Expo Router
  - Supabase
  - Server routes (+api)
  - Anthropic API
  - PayPal (sandbox)
---

## The problem

Buying a car while stationed overseas has friction a civilian purchase doesn't:
you might be paying cash or financing through a specific lender, you're headed to
a particular base, and you may still need a USAREUR driver's licence before you
can drive off the lot. A generic "browse cars" app ignores all of that and drops
you on a contact form.

## What I built

The full journey, in the real Used Car Guys brand (navy and red, Barlow type, the
real logo):

**Onboarding → Browse → Car detail → Start your deal → Specialist match →
Journey timeline → Documents → Sell it back.**

- **Live inventory.** Browse and Car Detail read real cars off usedcarguys.net —
  there's no public API yet, so it's a resilient scraper against the public
  pages, with a documented spec for the real endpoint it should become.
- **The chosen car carries through the flow.** "Choose This Car" is tracked so
  the specialist and timeline screens reference the actual vehicle, with its own
  photo gallery, not a placeholder.
- **A real intake before the salesperson.** A *Start Your Deal* screen gathers
  cash-vs-financed, destination base (a curated list of German military
  communities), and honest, researched **USAREUR licence guidance** — linking the
  actual JKO exam, with device-specific gotchas (the DoD certificate warning)
  explained inline instead of looking like broken links.
- **"Meet Your Specialist" chat** powered by the Anthropic API, with an honest
  fallback when the key isn't set, and a **PayPal sandbox deposit** flow to hold
  a car.

## Stack &amp; decisions

**Expo / React Native** with **Expo Router**, pinned to the SDK the published
Expo Go app supports so device testing never breaks. API keys never ship in the
client bundle — they're read only by server routes (`+api.ts` files) that Expo
Router keeps server-side. Deal state is held in typed React contexts as the user
moves through the flow, standing in for what a salesperson would enter into
Salesforce to open a real deal.
