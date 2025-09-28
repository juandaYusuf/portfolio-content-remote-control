export function usePlatform() {
  const isMobile = ref(false)

  const checkPlatform = () => {
    const userAgent = window.navigator.userAgent

    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet|Silk|Kindle|Windows Phone|Mobi/i

    const isUserAgentMobile = mobileRegex.test(userAgent)
    const isSmallViewport = window.innerWidth <= 768

    isMobile.value = isUserAgentMobile || isSmallViewport
  }

  onMounted(() => {
    checkPlatform()
    window.addEventListener('resize', checkPlatform)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkPlatform)
  })

  return {
    isMobile,
    checkPlatform
  }
}
