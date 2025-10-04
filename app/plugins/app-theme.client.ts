export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig()
  const localPrimaryColor = localStorage.getItem('primary-color')
  const localBgIntensityColor = localStorage.getItem('bg-intensity-color')
  appConfig.ui.colors.primary = localPrimaryColor ?? 'emerald'
  appConfig.ui.colors.neutral = localBgIntensityColor ?? 'slate'
})
