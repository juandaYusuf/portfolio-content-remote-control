import { type AppRouter, appRouter } from '../../server/trpc/routers'
import type { inferRouterInputs } from '@trpc/server'
// import { prisma } from '../../server/prisma' // adjust the import path as needed

export default defineEventHandler(async (event) => {
  const body = await readBody<inferRouterInputs<AppRouter>['addUser']>(event)
  const caller = appRouter.createCaller({
    auth: null,
    prisma,
  })
  const addUserSSR = await caller.addUser.create({
    name: body.create.name,
    email: body.create.email,
  })
  return addUserSSR
})
