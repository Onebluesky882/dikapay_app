import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { shop } from './shop'

// A verified, received payment — one row per accepted bank-slip QR. transRef is UNIQUE so the
// same physical slip can't be submitted twice (replay/fraud prevention). amount is satang,
// converted from Slip2Go's baht amount (see apps/api's payment route). Immutable once written —
// no updatedAt.
export const payment = sqliteTable('payment', {
  id: text('id').primaryKey(),
  shopId: text('shop_id').notNull().references(() => shop.id, { onDelete: 'cascade' }),
  transRef: text('trans_ref').notNull().unique(),
  amount: integer('amount').notNull(),
  receiverLast4: text('receiver_last4').notNull(),
  matchesWallet: integer('matches_wallet', { mode: 'boolean' }).notNull(),
  rawResponse: text('raw_response').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
