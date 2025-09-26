import { TRPCError } from '@trpc/server'
import { tRPCContext } from '../init'

export const isAuthed = tRPCContext.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Authentication required',
      cause: new Error('Access denied: no user found in context'),
    })
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  })
})
