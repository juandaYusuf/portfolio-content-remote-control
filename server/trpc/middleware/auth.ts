import { TRPCError } from "@trpc/server"
import { initTRPC } from "@trpc/server"
import type { TRPCContext } from "../init"

const t = initTRPC.context<TRPCContext>().create()

export const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return next({ ctx: { ...ctx, user: ctx.user } })
})