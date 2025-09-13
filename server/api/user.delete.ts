import { type AppRouter, appRouter } from '../../server/trpc/routers'
import type { inferRouterInputs } from '@trpc/server'

export default defineEventHandler(async (event) => {
  const body = await readBody<inferRouterInputs<AppRouter>['user']['remove']>(event)
  const caller = appRouter.createCaller({
    auth: null,
    prisma,
  })
  try {
    const removeUser = await caller.user.remove({
      id: body.id,
    })
    return removeUser
  } catch (err: any) {
    if (err.code === 'NOT_FOUND') {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong',
    })
  }
})
