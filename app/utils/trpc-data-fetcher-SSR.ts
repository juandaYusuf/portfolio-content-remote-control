import type { AppRouter } from '../../server/trpc/routers'
import type { inferRouterInputs, inferRouterOutputs, AnyRouter } from '@trpc/server'

type TProcedure<
  T extends AnyRouter,
  K extends keyof T['_def']['procedures'],
> = T['_def']['procedures'][K]['_def']['type']
const toKebabCase = (str: string) => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

// Ambil tipe procedure (query | mutation)
export const trpcDataFetcherSSR = <E extends keyof AppRouter['_def']['procedures']>(
  endpointName: E
): TProcedure<AppRouter, E> extends 'query'
  ? {
      query: (input?: inferRouterInputs<AppRouter>[E]) => Promise<inferRouterOutputs<AppRouter>[E]>
    }
  : {
      mutate: (input: inferRouterInputs<AppRouter>[E]) => Promise<inferRouterOutputs<AppRouter>[E]>
    } => {
  return {
    query: async (input?: inferRouterInputs<AppRouter>[E]) =>
      await $fetch<inferRouterOutputs<AppRouter>[E]>(
        `/api/${toKebabCase(endpointName as string)}`,
        { method: 'GET', query: input }
      ),
    mutate: async (input: inferRouterInputs<AppRouter>[E]) =>
      await $fetch<inferRouterOutputs<AppRouter>[E]>(
        `/api/${toKebabCase(endpointName as string)}`,
        { method: 'POST', body: input }
      ),
  } as any
}
