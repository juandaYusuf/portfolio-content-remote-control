import { type AppRouter, appRouter } from '../../server/trpc/routers'
import type { inferRouterInputs } from '@trpc/server'

export default defineEventHandler(async (event) => {
  const caller = appRouter.createCaller({
    auth: null,
    prisma,
  })
  const userList = await caller.user.list()
  return userList
})
