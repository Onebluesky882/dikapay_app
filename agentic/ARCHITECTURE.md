# ARCHITECTURE.md

## Overview

pnpm + Turborepo monorepo containing three independent Expo (React Native) apps plus one backend: `apps/api`, a Hono app on Cloudflare Workers, backed by Cloudflare D1 (via Drizzle) and better-auth. The backend was ported from the `goveragent-template` reference repo (see DECISIONS.md → "Backend Stack") and adapted to this project's domain.

## Modules / Components

| App/Package | Path | Role |
|---|---|---|
| Dikapay | `apps/Dikapay` | Customer-facing app — registration, verification, shop/checkout (`(shop)` route group) |
| Merchant | `apps/Merchant` | Merchant-facing app — accepting payments (`(shop)` route group) |
| Maneger | `apps/Maneger` | Admin/management app |
| api | `apps/api` | Backend — Hono on Cloudflare Workers. Currently exposes `/health` and `/api/auth/*` (login, register, better-auth session handling) |
| @gover-agent/db | `packages/db` | Drizzle ORM client bound to Cloudflare D1 (`createDb(d1)`), plus the `user`/`session`/`account`/`verification` schema |
| @gover-agent/auth | `packages/auth` | better-auth instance factory (`createAuth(db, trustedOrigins, ownerEmail)`), drizzle-adapter over `@gover-agent/db` |
| @gover-agent/config | `packages/config` | Shared tsconfig bases (`base`, `cloudflare`, `nextjs`) consumed by workspace packages |
| @gover-agent/slip-verification-service | `packages/slip-verification-service` | Standalone HTTP wrapper for Slip2Go bank-slip QR verification (scan-to-pay) |
| @gover-agent/chat-ops-core | `packages/chat-ops-core` | Platform-agnostic chat bot building blocks (LINE/Telegram/Meta webhook+client, command router) |

Shared conventions across apps:
- Routing: `expo-router` (file-based)
- Navigation chrome: `@react-navigation/bottom-tabs`, `@react-navigation/native`
- Styling: `uniwind` (Tailwind for React Native) — used in Dikapay and Merchant
- Animation/gestures: `react-native-reanimated`, `react-native-gesture-handler`
- State (Dikapay): `zustand`
- Local storage (Dikapay): `react-native-mmkv` (non-sensitive state), `expo-secure-store` (sensitive/token storage — see SECURITY_RULES.md)

## Data Flow

`apps/Dikapay` / `apps/Merchant` / `apps/Maneger` → `apps/api` (Hono, Cloudflare Workers) → `packages/db` (Drizzle → Cloudflare D1). Auth: any app calls `POST /api/auth/login` or `/api/auth/register`, or any other better-auth route under `/api/auth/*` (session, sign-out — handled by `auth.handler`); `packages/auth` issues a bearer token (via the `bearer()` plugin) for mobile clients to send as `Authorization: Bearer <token>` on subsequent requests. Scan-to-pay verification is a separate hop: apps call `packages/slip-verification-service` directly (own HTTP service, not behind `apps/api` yet).

## External Dependencies

- **Cloudflare Workers** — hosts `apps/api`
- **Cloudflare D1** — SQLite-compatible database, bound as `DB` in `apps/api`'s `wrangler.toml`; provisioned (`dikapay-db`), fully migrated both locally and remotely (auth, shop, dining_table, menu_item, modifier_group, modifier_option, payment — 10 tables, remote confirmed `v3-prod`/SIN region 2026-07-24, see PIPELINE.md → stage-9/stage-2/stage-4)
- **better-auth** — email/password auth, session, bearer-token issuance
- **Slip2Go** (via `packages/slip-verification-service`) — bank-slip/PromptPay QR verification for scan-to-pay

⸻

## Constraints

- Expo SDK and React Native versions must stay aligned across all three apps (see AGENT_RULES.md → Version Policy)
- No CI/CD or deploy pipeline is wired up yet — see CONDUCTOR.md → Verification & Deployment
- `apps/api`'s D1 database (`dikapay-db`) is fully migrated, but `apps/api` itself has never been deployed (`wrangler deploy`) — `SLIP_VERIFICATION_INTERNAL_SECRET` also isn't set as a real secret yet (`wrangler secret put`)
