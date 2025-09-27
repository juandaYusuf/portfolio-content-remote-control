import { TRPCError } from '@trpc/server'
import { baseProcedure, createTRPCRouter } from '../../init'

const { logout } = createTRPCRouter({
  logout: baseProcedure.query(async ({ ctx }) => {
    try {
      const refreshToken = getCookie(ctx.event, 'refreshToken')

      if (refreshToken) {
        await ctx.prisma.refreshToken.delete({
          where: {
            token: refreshToken,
          },
        })
      }

      deleteCookie(ctx.event, 'refreshToken', {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      })

      return {
        success: true,
        message: 'Logged out successfully',
      }
    } catch (err: any) {
      if (err instanceof TRPCError) throw err
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong',
      })
    }
  }),
})

export default logout
