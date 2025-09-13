import { type AppRouter, appRouter } from '../../server/trpc/routers'
import type { inferRouterInputs } from '@trpc/server'
import { verifyJwt } from '../../server/utils/jwt'

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  let user: null | { id: string; email: string } = null
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    user = verifyJwt<{ id: string; email: string }>(token)
  }
  console.log('user', user)
  const caller = appRouter.createCaller({
    user,
    prisma,
  })
  const userList = await caller.user.list()
  return userList
})
