import { httpBatchLink } from "@trpc/client/links/httpBatchLink"
import { defineNuxtPlugin } from "nuxt/app"
import { createTRPCNuxtClient } from "trpc-nuxt/client"
import type { AppRouter } from "../../server/trpc/routers"

export default defineNuxtPlugin((nuxtApp) => {
  const trpc = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
  })

  return {
    provide: {
      trpc,
    },
  }
})
