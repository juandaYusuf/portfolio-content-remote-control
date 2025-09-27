export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return
  const error = useError()
  const userAuth = useUserAuth()
  const userInfo = localStorage.getItem('user-info')
  if (userInfo) {
    const parsed: Record<string, any> = JSON.parse(userInfo)
    userAuth.value.id = parsed.id
    userAuth.value.name = parsed.name
    userAuth.value.username = parsed.username
    userAuth.value.createdAt = parsed.createdAt
  }

  try {
    if (to.path === '/' || error.value?.statusCode === 404) return
    const res = await $fetch('/api/auth/refresh')
    userAuth.value.accessToken = res?.accessToken ?? null
    if (to.path === '/sign-in' && !!res && !!userAuth.value.accessToken) {
      return navigateTo('/dashboard', {
        replace: true,
      })
    }
  } catch (err: any) {
    localStorage.removeItem('user-info')
    if (err.statusCode === 401 && to.path !== '/sign-in') {
      return reloadNuxtApp({
        path: '/',
      })
    }
  }
})
