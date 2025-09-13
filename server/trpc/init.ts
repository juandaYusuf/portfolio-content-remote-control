import { initTRPC } from '@trpc/server'
import type { H3Event } from 'h3'
import { prisma } from '../utils/prisma'
import { verifyJwt } from '../utils/jwt'

export const createTRPCContext = async (event: H3Event) => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  const authHeader = getHeader(event, 'authorization')
  let user: null | { id: string; email: string } = null

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    user = verifyJwt<{ id: string; email: string }>(token)
  }

  return {
    user,
    prisma,
  }
}
export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<TRPCContext>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
})

// Base router and procedure helpers
export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure
