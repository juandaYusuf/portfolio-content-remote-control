import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { defineNuxtPlugin } from 'nuxt/app'
import { createTRPCNuxtClient } from 'trpc-nuxt/client'
import type { AppRouter } from '../../server/trpc/routers'

export default defineNuxtPlugin((nuxtApp) => {
  const trpc = createTRPCNuxtClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
        headers() {
          const userAuth = useUserAuth()
          return userAuth.value.accessToken
            ? { Authorization: `Bearer ${userAuth.value.accessToken}` }
            : {}
          // return {
          //   Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxZDhiZTA2NC1jZDViLTRiYjktYjFhMi1hOTczODVmZGQwN2EiLCJ1c2VybmFtZSI6Il9fdWN1cGNvcmVfXyIsImlhdCI6MTc1ODg2OTI5MSwiZXhwIjoxNzU4ODcwMTkxfQ.hJuiKkIyd0K6bohnrkarqslvAYm-SMTGIYK9VFHl-Ng`,
          // }
        },
      }),
    ],
  })

  return {
    provide: {
      trpc,
    },
  }
})
