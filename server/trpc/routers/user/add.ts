import { baseProcedure, createTRPCRouter } from '../../init'
import { z } from 'zod'

const add = createTRPCRouter({
  create: baseProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      })
    }),
})

export default add
