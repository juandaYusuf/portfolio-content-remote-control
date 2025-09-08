import { type AppRouter, appRouter } from '../../server/trpc/routers'
import type { inferRouterInputs } from '@trpc/server'

export default defineEventHandler(async (event) => {
  const body = await readBody<inferRouterInputs<AppRouter>['trpcTest']>(event)
  const caller = appRouter.createCaller({})
  const trpcTestSSR = await caller.trpcTest({ name: body.name })
  return trpcTestSSR
})
