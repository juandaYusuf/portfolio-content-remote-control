import { baseProcedure, createTRPCRouter } from '../init'
import { z } from 'zod'
import { add , showAll} from '../routers/user'
// import { showAll } from './user/show'

export const appRouter = createTRPCRouter({
  addUser :add,
  showAllUser : showAll
})

// export type definition of API
export type AppRouter = typeof appRouter
