export const useRouteActive = () =>
  useState<{
    path: string
    trigeredBy: 'observer' | 'navbar'
  }>('route-active', () => ({
    path: '/',
    trigeredBy: 'navbar',
  }))
