# PIPELINE.md

Status: IN_PROGRESS
Owner: CONDUCTOR
Conductor Branch: main

---

## Stage Overview

| Stage | Domain | Depends On | Status |
|-------|--------|------------|--------|
| stage-1-governance-setup | agentic/, .claude/ | none | COMPLETE |
| stage-2-payment-core | packages/slip-verification-service, packages/db, apps/api, apps/Dikapay, apps/Merchant | stage-1, stage-9 | IN_PROGRESS |
| stage-3-line-ordering-chatbot | apps/Dikapay, new: packages/line-integration | stage-2 | PLANNING |
| stage-4-table-qr-ordering | apps/Dikapay, apps/Merchant, packages/db, apps/api | stage-2, stage-9 | IN_PROGRESS |
| stage-5-personal-transaction-ledger | apps/Dikapay | stage-2, stage-9 | PLANNING |
| stage-6-merchant-revenue-dashboard | apps/Merchant, apps/Maneger | stage-2, stage-8 | PLANNING |
| stage-7-multi-vertical-merchant-onboarding | apps/Merchant, packages/slip-verification-service | stage-2, stage-6, stage-8 | PLANNING |
| stage-8-role-permission-system | apps/Merchant, apps/Maneger, new: packages/rbac-core | stage-1, stage-9 | PLANNING |
| stage-9-backend-foundation | apps/api, packages/db, packages/auth, packages/config | stage-1 | IN_PROGRESS |

---

## Stage Detail

### stage-1-governance-setup

**Domain:** agentic/, .claude/
**Depends On:** none
**Status:** `COMPLETE`

**Done:** Adopted the Conductor + Worker governance system (from the `goveragent-template` reference clone) into this repo, adapted for an existing Expo/React Native pnpm+turbo monorepo instead of the template's Next.js/Hono/Cloudflare stack:
- Dropped: license-gate system, Cloudflare D1/Wrangler deploy steps, Bearer/cookie auth rules, Hono API-domain hooks (`api-docs-guard.sh`, `new-domain-privacy-check.sh`), CUSTOMER_SETUP.md / QUESTIONS.md business-owner onboarding flow (not applicable — `CLIENT_TYPE.md` fixed to `DEVELOPER`)
- Adapted: DESIGN_SYSTEM.md for React Native (uniwind/Reanimated instead of Tailwind/shadcn/web CSS), SECURITY_RULES.md for on-device secret storage (`expo-secure-store` vs MMKV), AGENT_RULES.md version policy for `expo install` vs `pnpm add`, CONDUCTOR.md deploy section left as a placeholder (no CI/CD or EAS pipeline exists yet)
- Kept as-is: GOVERNANCE_CORE.md, START_HERE.md, DEV.md, DEV_LOG.md structure, worktree isolation, parallel dispatch rules, gate-out/merge-approval flow, and hooks: `no-main-branch.sh`, `governance-english-only.sh`, `pipeline-roadmap-guard.sh`, `merge-approval-guard.sh`, `client-type-check.sh`, `client-info-check.sh`, `dependency-latest-version-guard.sh`, `gate-out-typecheck.sh` (edited to call `pnpm check-types` instead of `pnpm type-check`)

**Next:** Dev to define the first real feature stage with the Conductor (see ROADMAP.md → Next Steps).
**Blockers:** none

---

### stage-2-payment-core

**Domain:** packages/slip-verification-service, packages/db, apps/api, apps/Dikapay, apps/Merchant
**Depends On:** stage-1, stage-9
**Status:** `IN_PROGRESS`

**Goal:** Shared scan-to-pay engine that every later stage builds on. User scans a merchant's payment QR (bank-slip / PromptPay style, via the existing `slip-verification-service`), the transfer is verified server-side, and both sides get a confirmed payment event. This is the foundation for chat ordering, table ordering, the personal ledger, and merchant analytics — none of those can start until a payment event exists to hook into.

**Scope (Dev intent, to be broken into worker tasks by Conductor):**
- Dikapay: "scan to pay" flow — open camera/QR scanner, submit to `slip-verification-service`, show verified result
- Merchant: receive-payment flow — display payment QR, see incoming verified payments in real time
- Define the payment-event contract (see CONTRACTS.md) other stages will consume: amount, payer, receiver, timestamp, transRef, matchesWallet

**Done (backend, first slice — Dev: "ร้านค้ารับเงินได้ตรงจากลูกค้า โดยมีฟอร์มให้ลูกค้าถ่ายสลิป... บัญชีผู้รับ locked only owner can change"):**
- `packages/db` schema: `shop.receivingAccountNumber` (the account slips get matched against — owner-locked) and a new `payment` table (`shop-receiving-account.sql`, `payment.sql`). `payment.transRef` is `UNIQUE` — the same physical slip can't be recorded twice.
- `apps/api` routes:
  - `PATCH /api/shops/:slug/receiving-account` — **owner-locked**: requires an authenticated session (better-auth) whose `user.role === 'merchant_owner'` **and** `shop.ownerUserId === user.id` (not just any owner — the owner of *this* shop). Inline check for now — `TODO(stage-8)` to replace with `packages/rbac-core` once it exists.
  - `POST /api/payments/:slug` — takes a decoded slip `qrCode` (photo→QR decode is a client-side concern, not built here), calls `packages/slip-verification-service` with the shop's registered account, and only records the payment as received if `matchesWallet` is true. Rejects with 409 if the slip was already recorded (replay protection via the `UNIQUE` constraint).
- better-auth's `role` field declared via `user.additionalFields` in `packages/auth` — without this, `session.user.role` was invisible to TypeScript and silently absent from API responses (caught by `pnpm check-types`, not by inspection)
- Smoke-tested the full flow end to end against local D1 in this agent's sandbox: register → promote to `merchant_owner` (direct SQL, no admin UI yet) → `PATCH receiving-account` unauthenticated → 401 → authenticated as the correct owner → 200 → `POST payment` → correctly reaches the external slip-verification-service call and fails there gracefully (service isn't running in this sandbox) rather than crashing. Test user/data cleaned up afterward — Awarin's `owner_user_id`/`receiving_account_number` are back to `NULL`.
- `pnpm check-types` passes

**Not built yet:**
- The photo→QR-decode step itself (Dikapay/Merchant app, on-device camera + QR decoding library)
- Dikapay/Merchant UI for any of this (scan-to-pay screen, receiving-account settings screen, live incoming-payments view)
- `packages/slip-verification-service` is not deployed anywhere reachable from `apps/api` yet — Dev needs to run it (`pnpm dev` inside the package, default port 8090) and set matching `SLIP_VERIFICATION_URL` / `SLIP_VERIFICATION_INTERNAL_SECRET` wherever `apps/api` runs
- The payment-event contract in CONTRACTS.md (stage-5 ledger and stage-6 dashboard will consume this)

**Next:**
1. Dev: run `shop-receiving-account.sql` and `payment.sql` in your own local/remote D1 (same caveat as stage-4/stage-9 — this agent's local D1 is a separate file from yours)
2. Dev: run `packages/slip-verification-service` locally (needs `SLIP_2GO_SECRET` — real Slip2Go account) and point `apps/api`'s `SLIP_VERIFICATION_INTERNAL_SECRET`/`SLIP_VERIFICATION_URL` at it, to test with a real slip
3. Conductor: write the payment-event contract in CONTRACTS.md
4. Dikapay/Merchant: build the actual screens

**Blockers:** none technical — waiting on Dev to run the slip-verification-service locally with real Slip2Go credentials to test past the mocked-out point

---

### stage-3-line-ordering-chatbot

**Domain:** apps/Dikapay, new: packages/line-integration
**Depends On:** stage-2
**Status:** `PLANNING`

**Goal:** Let customers browse a merchant's menu and place an order from inside LINE chat, assisted by a chatbot (order taking, FAQ, order status). Order completion hands off to stage-2's payment flow.

**Scope (Dev intent):**
- LINE Official Account webhook + chatbot conversation flow (order intent, menu lookup, order confirmation)
- Link a LINE order to a Dikapay payment request (stage-2 contract)
- Merchant-side: receive and view LINE-originated orders alongside in-app orders

**Next:** Not started — depends on stage-2 payment-event contract being finalized first.
**Blockers:** stage-2 not complete

---

### stage-4-table-qr-ordering

**Domain:** apps/Dikapay, apps/Merchant, packages/db, apps/api
**Depends On:** stage-2, stage-9
**Status:** `IN_PROGRESS`

**Goal:** Dine-in flow — customer scans a QR code fixed to their table, sees that merchant's menu, orders, and pays without a server taking the order manually.

**Scope (Dev intent):**
- Table QR encodes merchant ID + table number
- Dikapay: scan → menu → cart → checkout (reuses stage-2 payment flow)
- Merchant: live view of open tables / orders-in-progress

**Done (data layer, backend-first — ahead of the RN screens):**
- `packages/db` schema: `shop`, `dining_table` (`shop.sql`), `menu_item` / `modifier_group` / `modifier_option` (`menu.sql`) — made-to-order model: an item has required/optional choice groups (e.g. protein, size — single-select; toppings — multi-select), each option carries its own `price_delta` in satang
- Real example data seeded (local D1 only so far): shop **เอวาริน (Awarin)** — 10 tables × 4 seats, `qr_token` per table (`awarin-t01`…`awarin-t10`); one menu item **กะเพรา** with protein/size/topping groups matching what Dev described (`seed-awarin.sql`, `seed-awarin-menu.sql`)
- `apps/api` routes: `GET /api/shops/:slug`, `GET /api/shops/:slug/tables`, `GET /api/shops/:slug/menu` (nests groups/options), `GET /api/tables/:qrToken` (this is the actual QR-scan resolution — scan → this endpoint → shop+table context)
- `pnpm check-types` passes

**Prices — MOCK, not real (Dev: "mock ราคาได้ตามใจชอบ"):** `base_price` 5000 (50.00 THB) for กะเพรา; `price_delta` 1000 (หมูกรอบ), 1500 (XL), 1500 (ใส่เบคอน), 1000 (ใส่เห็ดฟาง), all in satang. A fully-loaded order totals 100.00 THB. Realistic Thai street-food pricing, not Awarin's actual menu — replace when Dev gives real numbers.

**Next:**
1. Dev: run `shop.sql`, `menu.sql`, `seed-awarin.sql`, `seed-awarin-menu.sql` locally in your own terminal too — the local D1 this agent's sandbox writes to is a **separate** file from the one `pnpm dev` uses in your terminal (same happened with `auth.sql` — see DEV_LOG.md). Remote D1 has none of this yet either.
2. Dikapay app: build the actual scan → menu → cart screens consuming these routes
3. Merchant app: live orders-in-progress view (not started — no `order` table yet; that's the next schema piece once checkout flow is designed)

**Blockers:** none — waiting on Dev applying migrations in their own local/remote D1

---

### stage-5-personal-transaction-ledger

**Domain:** apps/Dikapay
**Depends On:** stage-2, stage-9
**Status:** `PLANNING`

**Goal:** Every time a user completes a scan-to-pay (from any of stage-2/3/4's flows), automatically record it as an income/expense entry in the user's personal ledger inside Dikapay — no manual bookkeeping.

**Scope (Dev intent):**
- Ledger data model (date, amount, counterparty/merchant, category, source stage)
- Ledger UI: history list, basic totals/summary
- Auto-write a ledger entry on every confirmed payment event from stage-2

**Next:** Not started — depends on stage-2 payment-event contract.
**Blockers:** stage-2 not complete

---

### stage-6-merchant-revenue-dashboard

**Domain:** apps/Merchant, apps/Maneger
**Depends On:** stage-2, stage-8
**Status:** `PLANNING`

**Goal:** Give merchants visibility into their own revenue data — every verified payment they receive, aggregated into a dashboard (daily/weekly totals, order source breakdown: in-app / LINE / table QR).

**Scope (Dev intent):**
- Merchant: revenue dashboard fed by stage-2 payment events
- Maneger (admin): cross-merchant aggregate view, for platform-level oversight

**Next:** Not started — depends on stage-2.
**Blockers:** stage-2 not complete

---

### stage-7-multi-vertical-merchant-onboarding

**Domain:** apps/Merchant, packages/slip-verification-service
**Depends On:** stage-2, stage-6, stage-8
**Status:** `PLANNING`

**Goal:** Generalize the payment system beyond restaurants — grocery stores and other non-food merchant types should be able to onboard and accept scan-to-pay through the same core (stage-2), without requiring a food-order/menu flow (stage-3/4 stay food-specific; this stage is payment-only onboarding for other verticals).

**Scope (Dev intent):**
- Merchant type/category field, distinguishing "orders + payment" (restaurants) from "payment only" (grocery, others)
- Merchant onboarding flow that works without a menu/ordering step
- Onboarding approval gated to `dikapay_admin` role (see stage-8 / DECISIONS.md → RBAC)
- Confirm stage-2's payment-event contract and stage-6's dashboard already work generically across merchant types (they should, if stage-2/6 were built vertical-agnostic)

**Next:** Not started — depends on stage-2, stage-6, and stage-8.
**Blockers:** stage-2, stage-6, stage-8 not complete

---

### stage-8-role-permission-system

**Domain:** apps/Merchant, apps/Maneger, new: packages/rbac-core
**Depends On:** stage-1, stage-9
**Status:** `PLANNING`

**Goal:** Shared RBAC layer implementing the role enum and permission matrix decided in DECISIONS.md → "Role-Based Access Control (RBAC), not per-role apps". `apps/Merchant` hosts three roles (staff / supervisor / owner) in one app gated by permission, `apps/Maneger` hosts `dikapay_admin`, `apps/Dikapay` stays role-implicit (`customer`).

**Scope (Dev intent):**
- `packages/rbac-core`: role enum, permission-check function, the permission matrix from DECISIONS.md as data (not hardcoded per screen)
- Merchant: session/login-time role lookup, screen- and action-level gating (menu edit, void/refund, revenue dashboard, staff management, store settings) driven by `rbac-core`
- Maneger: `dikapay_admin` gating for cross-merchant analytics, merchant onboarding approval, suspend/ban actions
- Staff management UI (owner invites/removes staff, assigns supervisor/staff role) — depends on this package existing first

**Next:** Conductor to write the `rbac-core` contract (role/permission shape) in CONTRACTS.md, then break into worker-sized tasks. Blocks stage-6 and stage-7, which both consume this package.
**Blockers:** stage-9 (needs `user.role` from the auth system, which now exists — see stage-9)

---

### stage-9-backend-foundation

**Domain:** apps/api, packages/db, packages/auth, packages/config
**Depends On:** stage-1
**Status:** `IN_PROGRESS`

**Goal:** Give the three RN apps a real backend — auth (email/password + bearer token for mobile) and a database — so every other stage that needs a logged-in user (stage-5 ledger, stage-8 RBAC, eventually stage-2/3/4) has something to build on. Ported from `goveragent-template`'s `packages/auth` + `packages/db`, which are already Cloudflare D1-native, and adapted to this project (see DECISIONS.md → "Backend Stack").

**Done:**
- `packages/config` — shared tsconfig bases, ported as-is (also fixes a pre-existing dangling `@gover-agent/config` reference in `packages/chat-ops-core`'s tsconfig)
- `packages/db` — Drizzle + D1 client (`createDb`), `user`/`session`/`account`/`verification` schema with `role` changed to this project's RBAC enum (`customer, merchant_staff, merchant_supervisor, merchant_owner, dikapay_admin`, `CHECK`-constrained in the migration), trimmed to auth-only schema (dropped template's `purchases`/`forum`/`roadmap` tables)
- `packages/auth` — better-auth instance (`createAuth`), owner-email hook now grants `dikapay_admin` instead of the template's `owner`, default trusted origins switched to local Expo dev URLs
- `apps/api` — new Hono app on Cloudflare Workers, trimmed to `/health` and `/api/auth/*` only (login, register with zod validation, better-auth catch-all for session/sign-out); `wrangler.toml` scaffolded with `OWNER_EMAIL` pre-filled, D1 binding present but **not provisioned**
- Root `.gitignore` extended with `.wrangler` and `.dev.vars`
- `pnpm check-types` passes for `@gover-agent/db`, `@gover-agent/auth`, `@gover-agent/api`
- Dev ran `wrangler login` and `wrangler d1 create dikapay-db` — D1 database provisioned, `database_id` filled into `apps/api/wrangler.toml` (kept `binding = "DB"` to match the code's `env.DB`, not the `dikapay_db` binding name wrangler's own create-output suggested)
- `packages/db/migrations/auth.sql` applied to the **local** D1 instance (`wrangler d1 execute dikapay-db --file=...`, no `--remote` flag — 4 commands executed successfully, creates the `user`/`session`/`account`/`verification` tables)

**Next (Dev/Conductor):**
1. `cp .dev.vars.example .dev.vars` in `apps/api/`, then `pnpm dev` to smoke-test `/health` and `POST /api/auth/register` against the local D1
2. When ready to actually deploy: re-run the migration with `--remote` (`wrangler d1 execute dikapay-db --remote --file=../../packages/db/migrations/auth.sql`) — the local run above does **not** touch the remote database
3. Conductor: write the `/api/auth/*` contract in CONTRACTS.md once verified working

**Blockers:** none — D1 provisioned and migrated locally; remote migration + first `pnpm dev` smoke test still pending

---

<!-- Add one section per stage -->

## Deploy Checklist (run after every stage)

```bash
pnpm check-types
pnpm lint
# no test suite and no deploy/CI pipeline wired up yet — add commands here once they exist
```

All checks must pass before Conductor writes merge-approval.
