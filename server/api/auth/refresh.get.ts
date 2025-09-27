import { TRPCError } from '@trpc/server'
import { appRouter } from '../../../server/trpc/routers'

export default defineEventHandler(async (event) => {
  try {
    const caller = appRouter.createCaller({
      user: null,
      event,
      prisma,
    })

    const refresh = await caller.auth.refresh()
    return refresh
  } catch (err) {
    if (err instanceof TRPCError) {
      throw createError({
        statusCode: err.code === 'UNAUTHORIZED' ? 401 : 500,
        statusMessage: err.message,
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
