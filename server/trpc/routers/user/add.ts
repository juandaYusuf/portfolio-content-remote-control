import { TRPCError } from '@trpc/server'
import { baseProcedure, createTRPCRouter } from '../../init'
import { z } from 'zod'

const { add } = createTRPCRouter({
  add: baseProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.user.create({
          data: {
            name: input.name,
            email: input.email,
          },
        })
      } catch (err: any) {
        if (err.code === 'P2002') {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'User already exists',
          })
        }
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
        })
      }
    }),
})

export default add
