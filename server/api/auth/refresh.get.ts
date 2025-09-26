import { appRouter } from '../../../server/trpc/routers'

export default defineEventHandler(async (event) => {
  const caller = appRouter.createCaller({
    user: null,
    event,
    prisma,
  })

  const signUp = await caller.auth.refresh()
  return signUp
})
