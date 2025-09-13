import { baseProcedure, createTRPCRouter } from '../../init'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

const { remove } = createTRPCRouter({
  remove: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.user.delete({
          where: {
            id: input.id,
          },
        })
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

export default remove
