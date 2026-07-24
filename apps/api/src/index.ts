import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { health } from './domains/health/health.route'
import { authRouter } from './domains/auth/auth.route'
import { shopRouter } from './domains/shop/shop.route'
import { tableRouter } from './domains/shop/table.route'
import { paymentRouter } from './domains/payment/payment.route'

type Bindings = {
  DB: D1Database
  OWNER_EMAIL: string
  ALLOWED_ORIGINS: string
  SLIP_VERIFICATION_URL: string
  SLIP_VERIFICATION_INTERNAL_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', async (c, next) => {
  const extra = (c.env.ALLOWED_ORIGINS ?? '').split(',').filter(Boolean)
  return cors({
    origin: ['http://localhost:8081', 'http://localhost:19006', ...extra],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })(c, next)
})

app.route('/health', health)
app.route('/api/auth', authRouter)
app.route('/api/shops', shopRouter)
app.route('/api/tables', tableRouter)
app.route('/api/payments', paymentRouter)

export default app
