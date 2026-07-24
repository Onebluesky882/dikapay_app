import { Hono } from 'hono'
import { createDb, eq, inArray } from '@gover-agent/db'
import { shop, diningTable, menuItem, modifierGroup, modifierOption } from '@gover-agent/db/schema'
import { createAuth } from '@gover-agent/auth'
import { can, type Role } from '@gover-agent/rbac-core'
import { z } from 'zod'

type Bindings = { DB: D1Database; OWNER_EMAIL: string; ALLOWED_ORIGINS: string }

const shopRouter = new Hono<{ Bindings: Bindings }>()

const updateReceivingAccountSchema = z.object({
  receivingAccountNumber: z.string().min(4),
})

async function findShopBySlug(db: ReturnType<typeof createDb>, slug: string) {
  const [row] = await db.select().from(shop).where(eq(shop.slug, slug)).limit(1)
  return row
}

async function getCurrentUser(c: { env: Bindings; req: { raw: Request } }) {
  const db = createDb(c.env.DB)
  const auth = createAuth(db, undefined, c.env.OWNER_EMAIL)
  const session = await auth.api.getSession({ headers: c.req.raw.headers })
  return session?.user ?? null
}

shopRouter.get('/:slug', async (c) => {
  const db = createDb(c.env.DB)
  const row = await findShopBySlug(db, c.req.param('slug'))
  if (!row) return c.json({ error: 'Shop not found' }, 404)
  return c.json(row)
})

// Gated by packages/rbac-core's permission matrix (DECISIONS.md RBAC: "shop:manage-settings"
// is owner-only) PLUS a resource-ownership check — rbac-core only knows "this role can manage
// *a* shop's settings", not "this user owns *this* shop", which stays this route's job.
shopRouter.patch('/:slug/receiving-account', async (c) => {
  const db = createDb(c.env.DB)
  const shopRow = await findShopBySlug(db, c.req.param('slug'))
  if (!shopRow) return c.json({ error: 'Shop not found' }, 404)

  const user = await getCurrentUser(c)
  if (!user) return c.json({ error: 'Unauthorized' }, 401)
  // better-auth's additionalFields types role as plain string, not the Role union — the DB's
  // CHECK constraint (packages/db/migrations/auth.sql) is what actually guarantees this cast is safe.
  if (!can(user.role as Role, 'shop:manage-settings') || shopRow.ownerUserId !== user.id) {
    return c.json({ error: 'Only the shop owner can change the receiving account' }, 403)
  }

  const parsed = updateReceivingAccountSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400)

  await db
    .update(shop)
    .set({ receivingAccountNumber: parsed.data.receivingAccountNumber, updatedAt: new Date() })
    .where(eq(shop.id, shopRow.id))

  return c.json({ ok: true })
})

shopRouter.get('/:slug/tables', async (c) => {
  const db = createDb(c.env.DB)
  const shopRow = await findShopBySlug(db, c.req.param('slug'))
  if (!shopRow) return c.json({ error: 'Shop not found' }, 404)

  const tables = await db.select().from(diningTable).where(eq(diningTable.shopId, shopRow.id))
  return c.json(tables)
})

// Nests groups/options under each item in application code — small menus, not worth a
// relational-query config for this. Prices are in satang; some are seeded as mock values,
// see packages/db/migrations/seed-awarin-menu.sql.
shopRouter.get('/:slug/menu', async (c) => {
  const db = createDb(c.env.DB)
  const shopRow = await findShopBySlug(db, c.req.param('slug'))
  if (!shopRow) return c.json({ error: 'Shop not found' }, 404)

  const items = await db.select().from(menuItem).where(eq(menuItem.shopId, shopRow.id))
  if (items.length === 0) return c.json([])

  const groups = await db
    .select()
    .from(modifierGroup)
    .where(inArray(modifierGroup.menuItemId, items.map((i) => i.id)))

  const options = groups.length
    ? await db
        .select()
        .from(modifierOption)
        .where(inArray(modifierOption.modifierGroupId, groups.map((g) => g.id)))
    : []

  const menu = items.map((item) => ({
    ...item,
    modifierGroups: groups
      .filter((g) => g.menuItemId === item.id)
      .map((group) => ({
        ...group,
        options: options.filter((o) => o.modifierGroupId === group.id),
      })),
  }))

  return c.json(menu)
})

export { shopRouter }
