import { betterAuth } from 'better-auth'
import { bearer } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import type { Db } from '@gover-agent/db'
import { eq } from '@gover-agent/db'
import * as schema from '@gover-agent/db/schema'

export function createAuth(db: Db, trustedOrigins?: string[], ownerEmail?: string) {
  return betterAuth({
    database: drizzleAdapter(db, {
      provider: 'sqlite',
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
      },
    }),
    plugins: [bearer()],
    emailAndPassword: { enabled: true },
    // better-auth doesn't infer custom drizzle columns automatically — role must be declared
    // here too, or session.user.role is invisible to TypeScript (and left out of API responses).
    user: {
      additionalFields: {
        role: {
          type: 'string',
          required: true,
          defaultValue: 'customer',
          input: false, // set by databaseHooks below / DB default, never client-supplied
        },
      },
    },
    databaseHooks: {
      user: {
        create: {
          after: async (user) => {
            if (ownerEmail && user.email === ownerEmail) {
              await db.update(schema.user).set({ role: 'dikapay_admin' }).where(eq(schema.user.id, user.id))
            }
          },
        },
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      cookieCache: { enabled: true, maxAge: 60 * 5 },
    },
    // Defaults cover local Expo dev for the three RN apps (Dikapay, Merchant, Maneger);
    // override with ALLOWED_ORIGINS once each app has a real deploy/EAS URL.
    trustedOrigins: trustedOrigins ?? [
      'http://localhost:8081',
      'http://localhost:19006',
      'exp://localhost:8081',
    ],
    advanced: {
      crossSubdomainCookies: {
        enabled: true,
        domain: '',
      },
      defaultCookieAttributes: {
        sameSite: 'none',
        secure: true,
      },
    },
  })
}

export type Auth = ReturnType<typeof createAuth>
