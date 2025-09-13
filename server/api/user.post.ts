import { type AppRouter, appRouter } from '../../server/trpc/routers'
import type { inferRouterInputs } from '@trpc/server'

export default defineEventHandler(async (event) => {
  const body = await readBody<inferRouterInputs<AppRouter>['user']['add']>(event)
  const caller = appRouter.createCaller({
    auth: null,
    prisma,
  })
  const addUser = await caller.user.add({
    name: body.name,
    email: body.email,
  })
  return addUser
})
