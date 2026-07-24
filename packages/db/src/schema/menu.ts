import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { shop } from './shop'

// All prices are stored in satang (1 baht = 100 satang) to avoid floating-point money bugs.
export const menuItem = sqliteTable('menu_item', {
  id: text('id').primaryKey(),
  shopId: text('shop_id').notNull().references(() => shop.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  basePrice: integer('base_price').notNull(),
  description: text('description'),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

// A choice group on one menu item — e.g. "protein" (pick one, required) or "toppings" (pick any).
export const modifierGroup = sqliteTable('modifier_group', {
  id: text('id').primaryKey(),
  menuItemId: text('menu_item_id').notNull().references(() => menuItem.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  selectionType: text('selection_type', { enum: ['single', 'multiple'] }).notNull(),
  isRequired: integer('is_required', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})

// A single option inside a group — e.g. "crispy pork" or "size XL" — with its own price delta
// added on top of the menu item's base_price (can be 0 or negative).
export const modifierOption = sqliteTable('modifier_option', {
  id: text('id').primaryKey(),
  modifierGroupId: text('modifier_group_id').notNull().references(() => modifierGroup.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  priceDelta: integer('price_delta').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})
