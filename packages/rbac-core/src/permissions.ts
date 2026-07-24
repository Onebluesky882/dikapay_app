import type { Role } from './roles'

// The permission matrix from agentic/DECISIONS.md, as data. Add a permission here (not as a
// hardcoded role check at the call site) so the matrix stays the one place that decides who can
// do what — see apps/api's shop.route.ts for how a call site uses this.
export const PERMISSIONS = {
  'order:place': ['customer'],
  'ledger:view-own': ['customer'],
  'shop:view-orders': ['merchant_staff', 'merchant_supervisor', 'merchant_owner'],
  'shop:accept-payment': ['merchant_staff', 'merchant_supervisor', 'merchant_owner'],
  'shop:manage-menu': ['merchant_supervisor', 'merchant_owner'],
  'shop:void-refund': ['merchant_supervisor', 'merchant_owner'],
  'shop:view-revenue': ['merchant_supervisor', 'merchant_owner'],
  'shop:manage-staff': ['merchant_owner'],
  'shop:manage-settings': ['merchant_owner'],
  'platform:cross-merchant-analytics': ['dikapay_admin'],
  'platform:approve-merchant': ['dikapay_admin'],
  'platform:suspend-account': ['dikapay_admin'],
} as const satisfies Record<string, readonly Role[]>

export type Permission = keyof typeof PERMISSIONS

// Role → permission only. Whether this user owns *this specific* shop (vs. some other shop) is
// a resource-ownership check, not a role check — that stays the caller's job (see
// apps/api/src/domains/shop/shop.route.ts, which checks shop.ownerUserId separately).
export function can(role: Role, permission: Permission): boolean {
  return (PERMISSIONS[permission] as readonly Role[]).includes(role)
}
