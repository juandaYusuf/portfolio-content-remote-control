import { baseProcedure, createTRPCRouter } from '../init'
import { z } from 'zod'
import trpcTest from './trpc-test'

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: trpcTest(opts.input.text),
      }
    }),
  trpcTest: baseProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation((opts) => {
      return {
        greeting: trpcTest(opts.input.name),
      }
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
