import { TRPCError } from '@trpc/server'
import { baseProcedure, createTRPCRouter } from '../../init'
import { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } from '../../../utils/jwt-config'

const { refresh } = createTRPCRouter({
  refresh: baseProcedure.query(async ({ ctx }) => {
    try {
      const refreshToken = getCookie(ctx.event, 'refreshToken')

      if (!refreshToken) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'No refresh token provided',
        })
      }

      const storedToken = await ctx.prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      })

      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid or expired refresh token',
        })
      }

      const newAccessToken = signJwt(
        {
          sub: storedToken.user.id,
          username: storedToken.user.username,
        },
        ACCESS_TOKEN_EXPIRES_IN
      )

      return { accessToken: newAccessToken }
    } catch (err: any) {
      if (err instanceof TRPCError) {
        throw err
      }

      if (err.statusCode) {
        throw new TRPCError({
          code: err.statusCode === 401 ? 'UNAUTHORIZED' : 'INTERNAL_SERVER_ERROR',
          message: err.statusMessage || 'Unexpected error',
        })
      }

      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong',
      })
    }
  }),
})

export default refresh
