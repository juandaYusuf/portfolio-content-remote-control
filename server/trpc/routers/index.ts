import { baseProcedure, createTRPCRouter } from '../init'
import { z } from 'zod'
import { addUser } from './administrations/add-user'

export const appRouter = createTRPCRouter({
  addUser,
})

// export type definition of API
export type AppRouter = typeof appRouter
