import { TRPCError } from '@trpc/server'
import { baseProcedure, createTRPCRouter } from '../../init'
import { isAuthed } from '../../middleware/auth'

const { list } = createTRPCRouter({
  list: baseProcedure.use(isAuthed).query(async ({ ctx }) => {
    try {
      const list = await ctx.prisma.user.findMany()
      const safeList = list.map(({ password, ...user }) => user)
      return safeList
    } catch (err: any) {
      if (err instanceof TRPCError) {
        throw err
      }
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong',
      })
    }
  }),
})

export default list
