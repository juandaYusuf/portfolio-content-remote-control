import { getQuery, defineEventHandler } from "h3"
import { appRouter } from "../../server/trpc/routers"

export default defineEventHandler(async (event) => {
  const fromQuery = getQuery(event)
  const body = await readBody(event)
  const { name } = body
  console.log(fromQuery)
  console.log(body)
  const caller = appRouter.createCaller({})
  const greeting = await caller.trpcTest({ name: name || "gk masuk" })
  return greeting
})
