import { describe, expect, it } from 'vitest'
import { can, PERMISSIONS } from './permissions'
import { ROLES } from './roles'

describe('can', () => {
  it('grants staff the ability to accept payment but not manage settings', () => {
    expect(can('merchant_staff', 'shop:accept-payment')).toBe(true)
    expect(can('merchant_staff', 'shop:manage-settings')).toBe(false)
  })

  it('grants supervisor menu management but not staff management', () => {
    expect(can('merchant_supervisor', 'shop:manage-menu')).toBe(true)
    expect(can('merchant_supervisor', 'shop:manage-staff')).toBe(false)
  })

  it('grants owner every merchant-side permission', () => {
    expect(can('merchant_owner', 'shop:manage-settings')).toBe(true)
    expect(can('merchant_owner', 'shop:manage-staff')).toBe(true)
    expect(can('merchant_owner', 'shop:view-revenue')).toBe(true)
  })

  it('does not grant merchant permissions to a customer', () => {
    expect(can('customer', 'shop:accept-payment')).toBe(false)
    expect(can('customer', 'shop:manage-settings')).toBe(false)
  })

  it('reserves platform permissions for dikapay_admin only', () => {
    for (const role of ROLES) {
      if (role === 'dikapay_admin') continue
      expect(can(role, 'platform:approve-merchant')).toBe(false)
      expect(can(role, 'platform:suspend-account')).toBe(false)
    }
    expect(can('dikapay_admin', 'platform:approve-merchant')).toBe(true)
  })

  it('every permission maps to at least one real role', () => {
    for (const roles of Object.values(PERMISSIONS)) {
      expect(roles.length).toBeGreaterThan(0)
      for (const role of roles) {
        expect(ROLES).toContain(role)
      }
    }
  })
})
