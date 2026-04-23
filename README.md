# lap-webapp

Next.js 14 Driver OS webapp at `app.lap.com`. Marketing site is separate at `lap-website/` (to be extracted).

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
