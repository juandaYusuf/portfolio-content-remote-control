import { createTRPCRouter } from '../init'
import * as user from '../routers/user'

export const appRouter = createTRPCRouter({
  user: {
    add: user.add,
    list: user.list,
    remove: user.remove
  },
})

// export type definition of API
export type AppRouter = typeof appRouter
