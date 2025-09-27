import { createTRPCRouter } from '../init'
import * as user from '../routers/user'
import * as auth from '../routers/auth'

export const appRouter = createTRPCRouter({
  user: {
    signUp: user.signUp,
    signIn: user.signIn,
    list: user.list,
    remove: user.remove,
  },
  auth: {
    refresh: auth.refresh,
    logout : auth.logout
  },
})

// export type definition of API
export type AppRouter = typeof appRouter
