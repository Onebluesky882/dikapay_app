import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { user } from './auth'

export const shop = sqliteTable('shop', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  ownerUserId: text('owner_user_id').references(() => user.id),
  // The bank/PromptPay account slips are matched against for this shop's payments (see
  // packages/db/src/schema/payment.ts). Locked to the owner — see DECISIONS.md RBAC ("Manage
  // store settings" is owner-only) — enforced in apps/api's PATCH .../receiving-account handler.
  receivingAccountNumber: text('receiving_account_number'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

// qrToken is what's actually encoded in the physical QR code on the table —
// scanning it resolves straight to { shop, table } context (see stage-4 in PIPELINE.md).
export const diningTable = sqliteTable('dining_table', {
  id: text('id').primaryKey(),
  shopId: text('shop_id').notNull().references(() => shop.id, { onDelete: 'cascade' }),
  tableNumber: integer('table_number').notNull(),
  seats: integer('seats').notNull(),
  qrToken: text('qr_token').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})
