import { Hono } from 'hono'
import { createDb, eq } from '@gover-agent/db'
import { shop, payment } from '@gover-agent/db/schema'
import { submitSlipSchema } from './payment.schema'

type Bindings = {
  DB: D1Database
  SLIP_VERIFICATION_URL: string
  SLIP_VERIFICATION_INTERNAL_SECRET: string
}

interface SlipVerificationResponse {
  transRef: string
  amount: number // baht, from Slip2Go — converted to satang before storing
  receiverName: string
  receiverLast4: string
  matchesWallet?: boolean
  raw: unknown
}

const paymentRouter = new Hono<{ Bindings: Bindings }>()

// The customer's slip-photo → QR-decode step happens on-device (Dikapay/Merchant app); this
// endpoint takes the decoded qrCode, verifies it against packages/slip-verification-service,
// and — only if the slip's receiver matches this shop's registered account — records it as
// received. shop.receivingAccountNumber is owner-locked (see shop.route.ts).
paymentRouter.post('/:slug', async (c) => {
  const db = createDb(c.env.DB)
  const [shopRow] = await db.select().from(shop).where(eq(shop.slug, c.req.param('slug'))).limit(1)
  if (!shopRow) return c.json({ error: 'Shop not found' }, 404)
  if (!shopRow.receivingAccountNumber) {
    return c.json({ error: 'This shop has not set up a receiving account yet' }, 400)
  }

  const parsed = submitSlipSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400)

  let slip: SlipVerificationResponse
  try {
    const res = await fetch(`${c.env.SLIP_VERIFICATION_URL}/v1/verify-slip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Secret': c.env.SLIP_VERIFICATION_INTERNAL_SECRET,
      },
      body: JSON.stringify({
        qrCode: parsed.data.qrCode,
        walletAccountNumber: shopRow.receivingAccountNumber,
      }),
    })
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { error?: string }
      return c.json({ error: body.error ?? 'Slip verification failed' }, 502)
    }
    slip = await res.json()
  } catch {
    return c.json({ error: 'Could not reach slip verification service' }, 502)
  }

  if (!slip.matchesWallet) {
    return c.json({ error: "Slip receiver does not match this shop's registered account", slip }, 422)
  }

  try {
    const id = crypto.randomUUID()
    await db.insert(payment).values({
      id,
      shopId: shopRow.id,
      transRef: slip.transRef,
      amount: Math.round(slip.amount * 100),
      receiverLast4: slip.receiverLast4,
      matchesWallet: true,
      rawResponse: JSON.stringify(slip.raw),
      createdAt: new Date(),
    })
    return c.json({ id, transRef: slip.transRef, amount: slip.amount, status: 'received' })
  } catch {
    // trans_ref is UNIQUE — this almost always means the same slip was submitted twice.
    return c.json({ error: 'This slip has already been recorded' }, 409)
  }
})

export { paymentRouter }
