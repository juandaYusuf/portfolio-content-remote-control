import { TRPCError } from '@trpc/server'
import { baseProcedure, createTRPCRouter } from '../../init'
import { z } from 'zod'
import { signJwt } from '../../../utils/jwt'
import bcrypt from 'bcrypt'
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '../../../utils/jwt-config'


const { signIn } = createTRPCRouter({
  signIn: baseProcedure
    .input(
      z.object({  
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const config = useRuntimeConfig()
        const userCredential = await ctx.prisma.user.findFirst({
          where: {
            username: input.username,
          },
        })
        if (userCredential && (await bcrypt.compare(input.password, userCredential.password))) {
          const { password, ...user } = userCredential
          const refreshToken = crypto.randomUUID()
          const accessToken = signJwt(
            {
              sub: user.id,
              username: user.username,
            },
            ACCESS_TOKEN_EXPIRES_IN
          )
          await ctx.prisma.refreshToken.create({
            data: {
              token: refreshToken,
              userId: user.id,
              expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN),
            },
          })
          setCookie(ctx.event, 'refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: REFRESH_TOKEN_EXPIRES_IN / 1000,
          })
          return { accessToken, ...user }
        } else {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Username or password is incorrect',
          })
        }
      } catch (err: any) {
        console.error(err)
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

export default signIn
