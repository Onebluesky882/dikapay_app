// Single source of truth for the role enum — see agentic/DECISIONS.md → "Role-Based Access
// Control (RBAC), not per-role apps". packages/db imports ROLES for its drizzle column
// definition instead of hardcoding the list a second time.
//
// The one place this can't reach is packages/db/migrations/auth.sql's raw-SQL CHECK constraint
// — SQL migrations are static text, so that list must still be updated by hand if a role is
// added or removed here.
export const ROLES = [
  'customer',
  'merchant_staff',
  'merchant_supervisor',
  'merchant_owner',
  'dikapay_admin',
] as const

export type Role = (typeof ROLES)[number]
