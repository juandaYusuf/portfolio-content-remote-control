import type { AppRouter } from "../../server/trpc/routers"
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"

function toKebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

async function trpcDataFetcherSSR<E extends keyof inferRouterInputs<AppRouter>>(
  endpointName: E,
  method: "POST",
  reqBody: inferRouterInputs<AppRouter>[E]
): Promise<inferRouterOutputs<AppRouter>[E]>

async function trpcDataFetcherSSR<E extends keyof inferRouterInputs<AppRouter>>(
  endpointName: E,
  method: "GET",
  reqBody: inferRouterInputs<AppRouter>[E]
): Promise<inferRouterOutputs<AppRouter>[E]>


async function trpcDataFetcherSSR<E extends keyof inferRouterInputs<AppRouter>>(
  endpointName: E,
  method: "POST" | "GET",
  reqBody?: inferRouterInputs<AppRouter>[E]
) {
  return await $fetch<inferRouterOutputs<AppRouter>[E]>(`/api/${toKebabCase(endpointName as string)}`, {
    method,
    ...(method === "POST" ? { body: reqBody } : {}),
  })
}

export default trpcDataFetcherSSR
