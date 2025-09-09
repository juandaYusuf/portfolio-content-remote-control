import { baseProcedure, createTRPCRouter } from '../../init'
import { z } from 'zod'

const showAll = createTRPCRouter({
  showAll: baseProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findMany()
  }),
})

export default showAll
