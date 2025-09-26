import { type AppRouter, appRouter } from '../../../server/trpc/routers'
import type { inferRouterInputs } from '@trpc/server'

export default defineEventHandler(async (event) => {
  let user: null | { id: string; email: string } = null

  const authHeader = getHeader(event, 'authorization')
  const body = await readBody<inferRouterInputs<AppRouter>['user']['signUp']>(event)

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    user = verifyJwt<{ id: string; email: string }>(token)
  }

  const caller = appRouter.createCaller({
    event,
    user,
    prisma,
  })

  const signUp = await caller.user.signUp({
    name: body.name,
    username: body.username,
    password: body.password,
  })
  return signUp
})
