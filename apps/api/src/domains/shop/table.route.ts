import { Hono } from 'hono'
import { createDb, eq } from '@gover-agent/db'
import { shop, diningTable } from '@gover-agent/db/schema'

type Bindings = { DB: D1Database }

const tableRouter = new Hono<{ Bindings: Bindings }>()

// What a customer's table QR scan resolves to — shop + table context, before any order/payment exists.
tableRouter.get('/:qrToken', async (c) => {
  const db = createDb(c.env.DB)
  const [row] = await db
    .select({
      tableId: diningTable.id,
      tableNumber: diningTable.tableNumber,
      seats: diningTable.seats,
      shopId: shop.id,
      shopName: shop.name,
      shopSlug: shop.slug,
    })
    .from(diningTable)
    .innerJoin(shop, eq(diningTable.shopId, shop.id))
    .where(eq(diningTable.qrToken, c.req.param('qrToken')))
    .limit(1)

  if (!row) return c.json({ error: 'Table not found' }, 404)
  return c.json(row)
})

export { tableRouter }
