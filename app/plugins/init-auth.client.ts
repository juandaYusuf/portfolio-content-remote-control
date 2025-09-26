export default defineNuxtPlugin(async (nuxtApp) => {
  const userAuth = useUserAuth()
  const userInfo = localStorage.getItem('user-info')

  if (userInfo) {
    const parsed = JSON.parse(userInfo)
    userAuth.value.id = parsed.id
    userAuth.value.name = parsed.name
    userAuth.value.username = parsed.username
    userAuth.value.createdAt = parsed.createdAt
  }

  try {
    const res = await $fetch('/api/auth/refresh')
    userAuth.value.accessToken = res.accessToken
  } catch (err) {
    console.error('Failed to refresh token:', err)
    localStorage.removeItem('user-info')
    reloadNuxtApp({
      path: '/sign-in',
    })
  }
})
