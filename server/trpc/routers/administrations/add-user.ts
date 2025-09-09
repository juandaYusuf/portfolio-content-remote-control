import { baseProcedure, createTRPCRouter } from '../../init'
import { z } from 'zod'

export const addUser = createTRPCRouter({
  create: baseProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.create({
        data:{
          name: input.name,
          email: input.email
        }
      })
    }),
})