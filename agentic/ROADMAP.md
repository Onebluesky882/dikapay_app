---
status: DRAFT
owner: CONDUCTOR
last_updated: 2026-07-22
---

# ROADMAP.md

> **Workers may read this document. Workers must NOT modify this document.**
> Implementation planning belongs in PIPELINE.md.

---

## Purpose

This document defines the long-term direction of the project.

---

## Project Vision

Dikapay is a middleman platform connecting customers with restaurants and shops. A customer opens a shop inside the app, browses its menu, and pays at the table by scanning a QR code — no server needed to take the order or run a card machine. Merchants manage incoming orders either from the Merchant app or from a chat interface (LINE chatbot), and get their own revenue data from every payment received. The same scan-to-pay core is meant to extend beyond restaurants to grocery stores and other merchant types that don't need a menu at all — just payment.

---

## Problem Statement

- Small restaurants and shops in Thailand commonly rely on manual order-taking and bank-transfer QR slips shown at the table — no unified system to take orders, verify payment, and see revenue in one place.
- Customers have no single app to browse a shop's menu, order, and pay without waiting for staff.
- Merchants have no automatic way to reconcile "did this customer actually pay the right amount" without manually checking their bank app against a photo of a slip.
- Existing payment/ordering platforms are food-delivery-shaped (courier logistics) — this product is dine-in/at-the-shop-shaped (browse → order → pay at table), which is a different flow.

---

## Business Goals

### Goal 1 — Scan-to-pay works end to end

Description: A customer can scan a shop's payment QR, the transfer is verified automatically (via `packages/slip-verification-service`), and the merchant sees a confirmed payment without manually checking their bank app.

Success Criteria:
- [ ] Customer can complete a scan-to-pay from apps/Dikapay (stage-2)
- [ ] Merchant sees the confirmed payment in apps/Merchant in real time (stage-2)
- [ ] Every confirmed payment auto-records into the customer's personal ledger (stage-5)

### Goal 2 — Order without a server taking the order

Description: A customer at a table can view the shop's menu and place an order themselves, either via the Dikapay app (table QR) or via LINE chat, without a staff member manually writing it down.

Success Criteria:
- [ ] Table QR ordering flow works end to end (stage-4)
- [ ] LINE chatbot ordering flow works end to end (stage-3)
- [ ] Merchant can see and manage orders from both sources in one place — app or chat (stage-6)

### Goal 3 — Merchants get their own data, with the right people seeing the right things

Description: A shop owner sees revenue data their staff shouldn't see; staff can take orders and accept payment without touching settings or reports.

Success Criteria:
- [ ] RBAC gates merchant-side screens by role — staff / supervisor / owner (stage-8)
- [ ] Revenue dashboard live for merchant_owner and merchant_supervisor (stage-6)

### Goal 4 — Payment system works for non-restaurant merchants too

Description: Grocery stores and other shops that don't need a menu/ordering flow can still onboard and accept scan-to-pay through the same core.

Success Criteria:
- [ ] Merchant type distinguishes "orders + payment" vs "payment only" (stage-7)
- [ ] dikapay_admin can approve a non-food merchant onboarding (stage-7)

---

## Current Progress

<!-- Conductor updates this section to summarize, in plain language, what has been delivered so far. -->

- `agentic/` governance system adopted for this monorepo (2026-07-22)
- Full feature pipeline defined — 9 stages, see PIPELINE.md (2026-07-23)
- RBAC decided: 5 roles mapped onto the existing 3 apps, not per-role apps (2026-07-23, see DECISIONS.md)
- Backend foundation in progress: `packages/auth`, `packages/db`, `apps/api` ported from `goveragent-template` and adapted for this project (Cloudflare Workers + D1 + Drizzle + better-auth); D1 database not yet provisioned — see PIPELINE.md → stage-9

---

## Milestone Backlog

Milestones may be added, removed, reordered, or refined by the Conductor.

| ID | Name | Goal | Status |
|----|------|------|--------|
| M-001 | Backend foundation | Goal 1 (partial) | IN_PROGRESS |
| M-002 | Scan-to-pay + personal ledger | Goal 1 | PLANNING |
| M-003 | Ordering (LINE chat + table QR) | Goal 2 | PLANNING |
| M-004 | RBAC + merchant revenue dashboard | Goal 3 | PLANNING |
| M-005 | Multi-vertical merchant onboarding | Goal 4 | PLANNING |

**Status values:** PLANNING · APPROVED · IN_PROGRESS · COMPLETE · CANCELLED

---

## Next Steps

<!-- Conductor updates this section to summarize, in plain language, what happens next. -->

- Dev to provision the Cloudflare D1 database and run the auth migration (see PIPELINE.md → stage-9, "Next" — requires Cloudflare account access)
- Once stage-9 is verified working end to end, Conductor writes the `/api/auth/*` contract in CONTRACTS.md
- Conductor to break stage-2-payment-core into worker-sized tasks next — it's the dependency every other feature stage sits on

---

## Guiding Principles

1. Human governance first
2. Contracts before implementation
3. Architecture before coding
4. Validation before merge
5. Explicit documentation over assumptions

---

## Project Scope

**In Scope:**
- `apps/Dikapay`, `apps/Merchant`, `apps/Maneger`, `apps/api`
- `packages/db`, `packages/auth`, `packages/config`, `packages/slip-verification-service`, `packages/chat-ops-core`

**Out of Scope:**
- Courier/delivery logistics — this is a dine-in / at-the-shop product, not food delivery
- Card payments / payment gateways other than bank-transfer QR (Slip2Go) — not decided, revisit if merchants ask

---

## Governance

See `GOVERNANCE_CORE.md` for file ownership and the relationship between documents.

Workers may not modify ROADMAP.md. Dev may edit directly (see GOVERNANCE_CORE.md), logged in DEV_LOG.md.

---

## Final Statement

**ROADMAP.md** is the source of truth for project direction.

**PIPELINE.md** is the source of truth for project execution.
