import { TRPCError } from '@trpc/server'
import { baseProcedure, createTRPCRouter } from '../../init'
import { isAuthed } from '../../middleware/auth'

const { list } = createTRPCRouter({
  list: baseProcedure
  .use(isAuthed)
  .query(async ({ ctx }) => {
    try {
      return await ctx.prisma.user.findMany()
    } catch (err: any) {
      if (err.code === 'P2025') {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong',
      })
    }
  }),
})

export default list
