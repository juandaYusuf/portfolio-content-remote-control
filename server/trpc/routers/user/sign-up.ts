import { TRPCError } from '@trpc/server'
import { baseProcedure, createTRPCRouter } from '../../init'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { isAuthed } from '../../middleware/auth'


const usernameAvailabilityChecker = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    })
    return !user
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong',
    })
  }
}

const { signUp } = createTRPCRouter({
  signUp: baseProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        password: z.string().min(8, 'Password must be at least 8 characters'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const available = await usernameAvailabilityChecker(input.username)
        if (available) {
          const hashedPassword = await bcrypt.hash(input.password, 12)
          return await ctx.prisma.user.create({
            data: {
              name: input.name,
              username: input.username,
              password: hashedPassword,
            },
            select: {
              id: true,
              name: true,
              username: true,
            },
          })
        } else {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'User already exists',
          })
        }
      } catch (err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong',
        })
      }
    }),
})

export default signUp
