# DECISIONS.md

## Purpose
Record architectural decisions that all agents must follow. DECISIONS.md is authoritative — workers may not deviate without Conductor approval.

⸻

## Decision: Confirmed Stack (existing codebase)

**Date:** 2026-07-22
**Status:** ACCEPTED

**Context:**
This governance system was adopted into an existing codebase, not a greenfield project. The stack below reflects what is already in place, observed directly from the repo (`package.json`, `turbo.json`) rather than chosen fresh.

**Decision:**

| Setting | Value |
|---|---|
| Language | TypeScript |
| Apps | Expo (React Native) — `apps/Dikapay`, `apps/Merchant`, `apps/Maneger` |
| Routing | expo-router (file-based) |
| Monorepo tooling | pnpm workspaces + Turborepo |
| Styling | uniwind (Tailwind for RN) — Dikapay, Merchant |
| State management | zustand (Dikapay) |
| Local storage | react-native-mmkv (non-sensitive), expo-secure-store (sensitive) |
| Animation | react-native-reanimated + react-native-gesture-handler |
| Linting | `expo lint` per app (via `pnpm lint` / turbo) |
| Testing | none wired up yet |
| CI/CD | none wired up yet |

**Consequences:**
- New stages must use this stack unless a change is explicitly decided here and logged in DEV_LOG.md
- Adding a test framework or CI/CD pipeline requires a new Decision entry below before Workers rely on it

⸻

## Decision: Version Policy

**Date:** 2026-07-22
**Status:** ACCEPTED

**Context:**
Workers default to package versions from training data, which are outdated and, for Expo/React Native specifically, frequently incompatible with the SDK version already pinned in this project.

**Decision:**
All packages must use the latest stable version at time of installation unless a version is explicitly pinned below in "Pinned Versions". Expo-managed native modules must be installed via `npx expo install <package>`, not `pnpm add`, so the version stays compatible with the pinned Expo SDK. Workers must verify current version at runtime before installing — training-data version numbers are not authoritative.

Mandatory check before installing a non-Expo-managed package:
```bash
npm info <package> version
```

See AGENT_RULES.md → Version Policy for enforcement rules and violation consequences.

**Consequences:**
* Workers must run the version check and include verified version in gate-out `dependencies_added`
* Claiming "latest" without the check command output = Status: FAIL
* If a specific version is required, Dev or Conductor must pin it in "Pinned Versions" below

⸻

## Decision: Role-Based Access Control (RBAC), not per-role apps

**Date:** 2026-07-23
**Status:** ACCEPTED

**Context:**
The product needs five distinct actor types: general customer, merchant staff, merchant supervisor, merchant owner, and Dikapay company admin. The question was whether each role gets its own app, or roles are handled inside the existing three apps (`apps/Dikapay`, `apps/Merchant`, `apps/Maneger`) via permissions. Merchant-side roles (staff/supervisor/owner) share nearly all the same screens (orders, payments, menu) and differ only in which actions are permitted — building separate apps per role would triplicate maintenance for one shared UI.

**Decision:**

Actors map to apps by *context*, not by role granularity:

| Actor | App | Notes |
|---|---|---|
| Customer / general user | `apps/Dikapay` | No internal role split needed |
| Merchant staff, supervisor, owner | `apps/Merchant` | Single app, gated by RBAC — see matrix below |
| Dikapay company admin | `apps/Maneger` | Cross-merchant oversight |

RBAC lives in a new shared package, **`packages/rbac-core`**, consumed by `apps/Merchant` and `apps/Maneger` (and by any backend that authorizes API calls). It defines the role enum and a permission-check function; it does not implement UI.

**Role enum:** `customer`, `merchant_staff`, `merchant_supervisor`, `merchant_owner`, `dikapay_admin`

**Permission matrix (initial, extend as features land):**

| Permission | customer | merchant_staff | merchant_supervisor | merchant_owner | dikapay_admin |
|---|---|---|---|---|---|
| Place order / scan-to-pay | ✓ | | | | |
| View own personal transaction ledger | ✓ | | | | |
| View incoming orders (own store) | | ✓ | ✓ | ✓ | |
| Confirm/accept payment (own store) | | ✓ | ✓ | ✓ | |
| Edit menu / items | | | ✓ | ✓ | |
| Void / refund a transaction | | | ✓ | ✓ | |
| View store revenue dashboard (stage-6) | | | ✓ | ✓ | |
| Manage staff accounts (invite, remove, assign role) | | | | ✓ | |
| Manage store settings (hours, table QR codes, branches) | | | | ✓ | |
| Cross-merchant analytics / oversight | | | | | ✓ |
| Approve merchant onboarding, incl. non-food verticals (stage-7) | | | | | ✓ |
| Suspend/ban a merchant or user account | | | | | ✓ |

**Consequences:**
- `apps/Merchant` needs a login-time or session-time role lookup and must gate screens/actions through `packages/rbac-core`, not ad-hoc `if` checks scattered across the app
- stage-6-merchant-revenue-dashboard and stage-7-multi-vertical-merchant-onboarding (see PIPELINE.md) both consume this package once it exists — their dependencies are updated to include stage-8-role-permission-system
- Adding a new role or permission is a change to `packages/rbac-core` plus a row/column in this matrix, logged as a new Decision entry if the shape changes materially

⸻

## Decision: Backend Stack — Hono + Cloudflare Workers + D1 + Drizzle + better-auth

**Date:** 2026-07-23
**Status:** ACCEPTED

**Context:**
This repo had no backend (see prior ARCHITECTURE.md note). The three RN apps need a real auth+db service to reach MVP. Rather than design one from scratch, `packages/auth` and `packages/db` were ported from `goveragent-template` (same origin as `packages/chat-ops-core` and `packages/slip-verification-service`, already adopted into this repo) — that template's auth/db packages are already Cloudflare D1-native (`drizzle-orm/d1`), so "adapt for Cloudflare" meant wiring them up here, not switching platforms.

**Decision:**

| Layer | Choice | Notes |
|---|---|---|
| Runtime | Cloudflare Workers | `apps/api`, new in this repo |
| HTTP framework | Hono | matches template |
| Database | Cloudflare D1 (SQLite-compatible) | binding `DB`, not yet provisioned — see ARCHITECTURE.md → Constraints |
| ORM | Drizzle (`drizzle-orm/d1`) | `packages/db` |
| Auth | better-auth (email/password + bearer plugin) | `packages/auth`, bearer token for mobile clients (not cookie-based — the three apps are RN, not web) |
| Package scope | Kept `@gover-agent/*` | matches existing precedent (`slip-verification-service`, `chat-ops-core` kept the same scope when ported) — not renamed to a Dikapay-specific scope |

**Adaptations from the template (not a verbatim copy):**
- `packages/db`'s `user.role` enum changed from the template's generic `owner/client/member` to this project's RBAC roles: `customer, merchant_staff, merchant_supervisor, merchant_owner, dikapay_admin` (see the RBAC decision above) — enforced with a `CHECK` constraint in the raw migration, since this is a payment app
- `packages/db/src/schema/index.ts` trimmed to export only the auth schema (template also had `purchases`, `forum`, `roadmap` schemas — irrelevant to Dikapay, dropped)
- `packages/auth`'s owner-email hook now assigns `dikapay_admin` instead of `owner`
- `apps/api` trimmed to only the `health` and `auth` domains (template's `apps/api` also had `discord`, `payment` (Stripe), `nowpayments`, `telegram`, `forum`, `roadmap`, `agent`, `storage`, `email`, `setup`, `docs` — none of that is part of the auth+db scope; those domains are not ported)
- `apps/api`'s lint script switched from the template's `biome check .` to `eslint .` using this repo's existing `@repo/eslint-config` (this repo doesn't use Biome anywhere else)

**Consequences:**
- D1 database is not yet created — `wrangler dev` / `wrangler deploy` will not work until Dev runs `wrangler d1 create dikapay-db` (requires Cloudflare login) and pastes the returned `database_id` into `apps/api/wrangler.toml`, then applies `packages/db/migrations/auth.sql` (`wrangler d1 execute dikapay-db --file=../../packages/db/migrations/auth.sql`)
- Any future domain (payment, orders, chat webhook handling) that needs its own D1 table follows the same pattern: add a schema file under `packages/db/src/schema/`, export it from `schema/index.ts`, add a migration file, add a route under `apps/api/src/domains/`
- `.dev.vars` and `.wrangler` added to root `.gitignore` — secrets for `apps/api` must never be committed

⸻

## Pinned Versions

**Authority: Dev only.** Only Dev may add, change, or remove entries here. Conductor and Workers may NOT modify this table. Any change must be logged in DEV_LOG.md.

When a package appears in this table, workers must use the exact version specified — the `@latest` / `expo install` rule does NOT apply. Workers may not upgrade or downgrade without Dev approval.

| Package | Pinned Version | Reason | Pinned By | Date |
|---------|---------------|--------|-----------|------|
| expo | ~55.0.15 | Expo SDK aligned across all three apps | Dev | 2026-07-22 |
| react-native | 0.83.4 | Paired with pinned Expo SDK | Dev | 2026-07-22 |
| react | 19.2.0 | Paired with pinned Expo SDK | Dev | 2026-07-22 |

⸻

<!-- Add one section per decision -->
