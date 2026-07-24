DEV_LOG.md

Status: ACTIVE

Owner: DEV

⸻

Purpose

This file records every direct edit Dev makes to governance files or code.

Conductor must read this file regularly and reconcile ROADMAP.md, PROJECT.md, and PIPELINE.md based on new entries.

⸻

Entry Format

Date: YYYY-MM-DD
File(s) changed: <path(s)>
Reason: <why Dev made this change>
Impact: <what Conductor/Workers should know or update because of this>

⸻

Log

<!-- Add newest entries at the top -->

Date: 2026-07-24
File(s) changed: packages/db/src/schema/shop.ts, packages/db/src/schema/payment.ts (new), packages/db/src/schema/index.ts, packages/db/migrations/shop-receiving-account.sql (new), packages/db/migrations/payment.sql (new), packages/auth/src/auth.ts, apps/api/src/domains/shop/shop.route.ts, apps/api/src/domains/payment/* (new), apps/api/src/index.ts, apps/api/wrangler.toml, apps/api/.dev.vars.example, agentic/PIPELINE.md
Reason: Dev: start stage-2-payment-core — "ร้านค้ารับเงินได้ตรงจากลูกค้า โดยการมีฟอร์มให้ลูกค้าถ่ายสลิปรับเงิน เพื่อบันทึก received บัญชีผู้รับ locked only owner can change" (shop receives payment directly from customer via a slip-submission form; the receiving account is locked, only the owner can change it).
Impact:
- Added shop.receivingAccountNumber (owner-locked) and a payment table (transRef UNIQUE — prevents the same slip being recorded twice) to packages/db.
- Added apps/api routes: PATCH /api/shops/:slug/receiving-account (owner-locked — checks both user.role === 'merchant_owner' AND shop.ownerUserId === user.id, not just any owner) and POST /api/payments/:slug (verifies a decoded slip QR against packages/slip-verification-service using the shop's registered account, records as received only if matchesWallet).
- Had to declare role via better-auth's user.additionalFields in packages/auth — without it, session.user.role was invisible to TypeScript and silently missing from API responses even though the DB column existed and databaseHooks set it correctly. Caught by pnpm check-types, not by manual inspection — worth remembering for any other custom column added to the user table later.
- Smoke-tested the full owner-lock flow end to end (register → promote to merchant_owner via direct SQL → unauthenticated PATCH → 401 → authenticated as correct owner → 200 → payment POST reaches the external call and fails gracefully since slip-verification-service isn't running) against this agent's local D1, then cleaned up the test user and reset shop_awarin's owner/receiving-account back to NULL.
- pnpm check-types passes. PIPELINE.md stage-2 updated to IN_PROGRESS with full done/not-done breakdown. Photo→QR-decode and all app UI screens are NOT built — this pass was backend-only per Dev's "กลับมาทางระบบก่อน" direction.

Date: 2026-07-23
File(s) changed: packages/db/migrations/seed-awarin-menu.sql
Reason: Dev: "ราคาทุกตัวตอนนี้เป็น 0 (placeholder) — mock ราคาได้ตามใจชอบ" (prices are all 0 placeholders — mock them however I like).
Impact: Filled in realistic Thai street-food mock prices (satang): กะเพรา base 5000 (50 THB), หมูกรอบ +1000, XL +1500, ใส่เบคอน +1500, ใส่เห็ดฟาง +1000 (fully-loaded order = 100 THB). These are explicitly mock, not Awarin's real menu prices — flagged in the seed file and PIPELINE.md stage-4. Synced the already-seeded rows in this agent's local D1 via UPDATE (re-running the INSERT-based seed file would have hit the primary-key/unique constraints). Dev's own local D1 hasn't had the seed file run yet (per the previous entry), so running the now-updated seed-awarin-menu.sql fresh in their terminal will pick up the mock prices directly — no UPDATE needed on their end.

Date: 2026-07-23
File(s) changed: packages/db/src/schema/shop.ts (new), packages/db/src/schema/menu.ts (new), packages/db/src/schema/index.ts, packages/db/src/index.ts, packages/db/migrations/shop.sql (new), packages/db/migrations/menu.sql (new), packages/db/migrations/seed-awarin.sql (new), packages/db/migrations/seed-awarin-menu.sql (new), apps/api/src/domains/shop/* (new), apps/api/src/index.ts, agentic/PIPELINE.md
Reason: Dev gave a real shop to seed as example data — เอวาริน (Awarin, initially named "Aclass" then renamed mid-conversation), 10 tables × 4 seats, customers scan a per-table QR to order. Dev then described the ordering model: made-to-order, pick a dish (e.g. กะเพรา) then customize via required/optional choice groups (protein, size, toppings), each option individually priced.
Impact:
- Added `shop`/`dining_table` and `menu_item`/`modifier_group`/`modifier_option` schema to packages/db (generic — not Awarin-specific; Awarin is seed data, not a schema concept). Prices stored as integer satang.
- Added apps/api routes: GET /api/shops/:slug, /:slug/tables, /:slug/menu (nests groups/options), GET /api/tables/:qrToken (the actual QR-scan-to-table-context resolution).
- Seeded Awarin (shop_awarin) with 10 tables and one menu item (กะเพรา, protein=หมูกรอบ, size=XL, toppings=ใส่เบคอน/ใส่เห็ดฟาง) — all prices are 0 PLACEHOLDERS, Dev has not given real baht amounts. Do not treat as payable yet.
- Applied all four new migrations to local D1 successfully via this agent's sandbox — but discovered its local D1 file is NOT the same one the Dev's own terminal writes to (auth.sql, applied by Dev earlier, was missing here until re-applied). Dev needs to run shop.sql/menu.sql/seed-awarin.sql/seed-awarin-menu.sql themselves too before `pnpm dev` in their terminal will have this data. Remote D1 has none of it.
- pnpm check-types passes. Updated PIPELINE.md stage-4-table-qr-ordering to IN_PROGRESS with full detail on what's done/pending.

Date: 2026-07-23
File(s) changed: apps/api/wrangler.toml, agentic/PIPELINE.md, agentic/ARCHITECTURE.md
Reason: Dev ran `wrangler login` and `wrangler d1 create dikapay-db` (Cloudflare account onebluesky882@outlook.com), then applied packages/db/migrations/auth.sql to the local D1 instance — 4 tables created successfully.
Impact: Filled the returned database_id into apps/api/wrangler.toml's [[d1_databases]] block (kept binding = "DB" to match the code's env.DB, not the "dikapay_db" binding name wrangler's create-output suggested — worth double-checking if a future worker mixes up the two). PIPELINE.md stage-9 and ARCHITECTURE.md updated to reflect: D1 provisioned, auth schema migrated locally, remote migration still pending before first real deploy.

Date: 2026-07-23
File(s) changed: packages/config/* (new), packages/db/* (new), packages/auth/* (new), apps/api/* (new), .gitignore, agentic/PROJECT.md, agentic/ARCHITECTURE.md, agentic/DECISIONS.md, agentic/PIPELINE.md, agentic/ROADMAP.md
Reason: Dev asked to bring the auth+db service from goveragent-template and adapt it for Cloudflare for the MVP, and clarified the real product: Dikapay onboards restaurants/shops, customers browse a shop's menu and pay at the table, merchants manage orders via app or LINE chatbot.
Impact:
- Ported packages/auth + packages/db (+ packages/config, a missing dependency both need — also fixes a pre-existing dangling reference in packages/chat-ops-core's tsconfig) from goveragent-template, kept the @gover-agent/* scope (matching existing precedent). Adapted the user.role enum to this project's RBAC roles (customer/merchant_staff/merchant_supervisor/merchant_owner/dikapay_admin) instead of the template's generic owner/client/member; owner-email hook now grants dikapay_admin. Trimmed db schema/migrations to auth-only (dropped template's purchases/forum/roadmap tables — not part of this product).
- Created apps/api (new) — Hono on Cloudflare Workers, trimmed to /health and /api/auth/* only (template also had discord/payment/telegram/forum/roadmap/agent/storage/email/setup/docs domains — not ported, out of scope for this request). wrangler.toml scaffolded with OWNER_EMAIL pre-filled; D1 database NOT yet provisioned (requires Dev's Cloudflare login — see PIPELINE.md stage-9 "Next" for the exact commands).
- pnpm check-types passes for @gover-agent/db, @gover-agent/auth, @gover-agent/api. Added .wrangler and .dev.vars to root .gitignore.
- Updated PROJECT.md (real product description, replacing the placeholder), ARCHITECTURE.md (new backend module, data flow, external dependencies), DECISIONS.md (new "Backend Stack" decision), PIPELINE.md (new stage-9-backend-foundation, IN_PROGRESS; wired as a dependency of stage-5 and stage-8), and filled in ROADMAP.md (vision, problem statement, 4 business goals, milestone backlog, scope) — this file existed as a placeholder before, not created new.
Impact continues below for the RBAC decision this backend implements:

Date: 2026-07-23
File(s) changed: agentic/DECISIONS.md, agentic/PIPELINE.md
Reason: Decided how to handle the 5 actor types (customer, merchant staff, merchant supervisor, merchant owner, Dikapay company admin): map actors to the existing 3 apps by context (Dikapay/Merchant/Maneger), and handle the 3 merchant-side roles inside a single `apps/Merchant` via RBAC rather than 3 separate apps — they share almost all screens and differ only by permission.
Impact: Added "Role-Based Access Control (RBAC), not per-role apps" Decision to DECISIONS.md with the role enum and initial permission matrix. Added stage-8-role-permission-system to PIPELINE.md (packages/rbac-core, depends on stage-1 only). Updated stage-6-merchant-revenue-dashboard and stage-7-multi-vertical-merchant-onboarding to also depend on stage-8, since both gate access by role. Conductor should write the rbac-core contract in CONTRACTS.md before stage-8 work starts.

Date: 2026-07-23
File(s) changed: agentic/PIPELINE.md
Reason: Defined the product's real feature scope — scan-to-pay (via existing packages/slip-verification-service), LINE chat ordering + chatbot, table QR ordering, an auto-recorded personal transaction ledger for users, a merchant revenue dashboard, and onboarding grocery/other non-food merchants onto the same payment system.
Impact: Added stage-2 through stage-7 to PIPELINE.md, all Status: PLANNING, with stage-2-payment-core as the shared foundation everything else depends on. Conductor should reconcile ROADMAP.md (Milestone Backlog, Next Steps) and PROJECT.md (Goal, Current Stage) against this, then break stage-2 into worker-sized tasks and write the payment-event contract in CONTRACTS.md before any stage starts.

Date: 2026-07-22
File(s) changed: agentic/*, .claude/hooks/*, .claude/settings.json
Reason: Adopted the Conductor + Worker governance system from the `goveragent-template` reference repo, adapted for this repo's actual stack (Expo/React Native pnpm+turbo monorepo, not Next.js/Hono/Cloudflare).
Impact: See PIPELINE.md → stage-1-governance-setup for the full list of what was dropped, adapted, and kept as-is.
