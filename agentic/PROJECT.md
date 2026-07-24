# PROJECT.md

## Project Name
Dikapay

## Goal
Dikapay is a middleman platform that onboards restaurants and shops. A customer opens a shop inside the app, browses its menu, and pays at the table via scan-to-pay — no server needed to take the order manually. Merchants manage incoming orders either from the Merchant app or from a chat interface (LINE chatbot), and get their own revenue data from every payment they receive. The same payment core is meant to generalize beyond restaurants to grocery stores and other merchant types (payment-only, no menu). See ROADMAP.md for vision/business goals and PIPELINE.md for the staged build-out.

Three Expo/React Native apps by actor, not by role — see DECISIONS.md → "Role-Based Access Control (RBAC), not per-role apps":
- **Dikapay** — customer-facing: registration, verification, browse shop, view menu, scan-to-pay, personal transaction ledger
- **Merchant** — shop-facing, shared by owner/supervisor/staff (gated by RBAC): accept payments, manage orders, menu, revenue dashboard
- **Maneger** — Dikapay company admin: cross-merchant oversight, merchant onboarding approval

## Tech Stack
See DECISIONS.md for the full, authoritative list.

## Team / Agents
- Dev: project owner (see DEV.md)
- Conductor: orchestrates Workers per this governance system
- Workers: execute one stage/domain at a time (see AGENT_RULES.md)

## Current Stage
Backend foundation — `packages/auth`, `packages/db`, and `apps/api` (Hono on Cloudflare Workers, D1 via Drizzle, better-auth) ported from `goveragent-template` and adapted to this project's RBAC role enum. See PIPELINE.md → stage-9-backend-foundation.

---

## Status
ACTIVE

---

## Config

```
conductor_branch: main
owner_email: wansing05@gmail.com
```

<!-- conductor_branch: the branch all PRs merge into -->
<!-- owner_email: project owner — update if incorrect -->
