# lap-webapp

> ⚠️ **NOT THE PRODUCTION WEBAPP.** This repo is a rebuild scaffold (sprint queue T061–T133, UI primitives only — no auth, no routes for /login or /signup, no API). The live production webapp continues to be the V2 Next.js at `../lap_web/lap-website/`, deployed as the Cloudflare Worker `lap-website` and serving the auth + `/app/*` + `/api/*` paths on `lap-coach.racing`. Do not `cf:deploy` this repo expecting users to land in it.

Next.js 14 Driver OS rebuild aimed at eventually taking over the webapp routes from `lap_web/lap-website/`. Marketing site is separate at `../lap-website/` (Astro 5, already extracted and live).

## Sprint queue

This repo's 30-day sprint queue is at:
`C:/Users/Admin/Documents/Telemetry/docs/roadmap/sprint-30day/sprint-webapp.md`

## Architecture

See `C:/Users/Admin/Documents/Telemetry/docs/roadmap/02-ARCHITECTURE-DECISIONS.md`. Key ADRs:

- **ADR-002** — Extracted from `lap-website` monolith
- **ADR-004** — Consumes generated TS types from `@lap/schemas`
- **ADR-011** — Clerk for auth

## Status

Seeded 2026-04-23. Scaffold comes from sprint task T001.

## Dependency on backend

Webapp loop should start **after** `lap-backend` T045 is checked (TS codegen pipeline live). Earlier tasks (WA-001 → WA-020) only need the folder structure and can run before T045 lands.

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript strict
- Tailwind CSS
- TanStack Query v5
- Zustand (small UI stores only)
- `@lap/schemas` (generated types)
- Clerk (auth)
- Cloudflare Workers via OpenNext
