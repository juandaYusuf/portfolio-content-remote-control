import { type AppRouter, appRouter } from '../../server/trpc/routers'
import type { inferRouterInputs } from '@trpc/server'
// import { prisma } from '../../server/prisma' // adjust the import path as needed

export default defineEventHandler(async (event) => {
  const caller = appRouter.createCaller({
    auth: null,
    prisma,
  })
  const showAllUserSSR = await caller.showAllUser.showAll()
  return showAllUserSSR
})
