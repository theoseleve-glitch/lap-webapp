# CLAUDE.md — lap-webapp

Repo-scoped instructions. Extends `C:/Users/Admin/CLAUDE.md`.

## Context
- Stack: Next.js 14, React 18, TypeScript strict, Tailwind, TanStack Query v5.
- Sprint queue: `../docs/roadmap/sprint-30day/sprint-webapp.md`.
- ADRs: `../docs/roadmap/02-ARCHITECTURE-DECISIONS.md`.
- Doctrine: rendering layer only. No business rules, no threshold logic, no coaching text generation.

## Conventions
- Layout: `src/app/` (routes), `src/components/` (UI), `src/lib/` (utilities), `src/hooks/` (shared hooks).
- No file >500 LOC.
- No `any` types. `unknown` fine. `as any` forbidden.
- No local DTO duplicates — import from `@lap/schemas`.
- No fetch outside the typed API client from `@lap/schemas/client`.
- Use TanStack Query key factory in `src/lib/query-keys.ts`.
- Tailwind tokens only — no raw hex in components.

## Forbidden
- No coaching thresholds or rules in components.
- No `api.get<any>()`.
- No duplicated enums (import from schemas).
- No `--no-verify`.
- No build-step guardrail bypasses (ts errors must fail CI).

## /loop rules
- Read sprint file, pick next `[ ]`, complete fully, commit, mark `[x]` with sha.
- If the task depends on an unshipped backend endpoint, mark `[BLOCKED: waiting on lap-backend T###]`.
- Invoke superpowers:test-driven-development for new components + hooks.
- Invoke superpowers:verification-before-completion before claiming done.
