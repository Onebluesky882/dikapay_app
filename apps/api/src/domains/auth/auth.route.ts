import { Hono } from 'hono'
import { createAuth } from '@gover-agent/auth'
import { createDb } from '@gover-agent/db'
import { signInSchema, signUpSchema } from './auth.schema'

type Bindings = { DB: D1Database; OWNER_EMAIL: string; ALLOWED_ORIGINS: string }

const authRouter = new Hono<{ Bindings: Bindings }>()

function getAuth(env: Bindings) {
  const db = createDb(env.DB)
  const extra = (env.ALLOWED_ORIGINS ?? '').split(',').filter(Boolean)
  return createAuth(db, extra.length ? extra : undefined, env.OWNER_EMAIL)
}

authRouter.post('/login', async (c) => {
  const parsed = signInSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400)

  const auth = getAuth(c.env)
  try {
    const result = await auth.api.signInEmail({
      body: parsed.data,
      headers: c.req.raw.headers,
    })
    return c.json({ user: result.user, token: result.token })
  } catch {
    return c.json({ error: 'Invalid credentials' }, 401)
  }
})

authRouter.post('/register', async (c) => {
  const parsed = signUpSchema.safeParse(await c.req.json())
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400)

  const auth = getAuth(c.env)
  try {
    const result = await auth.api.signUpEmail({
      body: parsed.data,
      headers: c.req.raw.headers,
    })
    return c.json({ user: result.user, token: result.token })
  } catch {
    return c.json({ error: 'Sign up failed' }, 400)
  }
})

// Catch-all for all other better-auth routes (session, sign-out, etc.)
authRouter.all('/*', async (c) => {
  const auth = getAuth(c.env)
  return auth.handler(c.req.raw)
})

export { authRouter }
