<template>
  <div
    class="fixed bottom-0 z-50 flex h-[max-content] w-full items-center justify-center gap-2 md:top-0 md:px-2 md:pt-2"
  >
    <div
      class="flex h-16 w-screen items-center justify-between gap-2 border-t border-gray-300 bg-gray-200/50 px-2 shadow backdrop-blur-lg md:h-[max-content] md:w-[max-content] md:rounded-full md:border dark:border-gray-700 dark:bg-gray-800/50"
    >
      <UPopover arrow>
        <UButton
          variant="link"
          color="neutral"
          :ui="{
            base: 'p-0',
          }"
        >
          <UAvatar
            src="https://secure.gravatar.com/avatar/6f068646cd57b435b450aef8d70bd75338056ac550c67b5c852fff14f567d7ff?s=384&d=identicon"
            size="lg"
            class="border border-gray-400 dark:border-gray-600"
          />
        </UButton>

        <template #content>
          <div class="m-4 inline-flex size-48" />
        </template>
      </UPopover>

      <UNavigationMenu :items="items" />
      <div class="flex size-9 items-center justify-center rounded-full text-lg">
        <ClientOnly v-if="!colorMode?.forced">
          <UButton
            :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
            color="neutral"
            variant="ghost"
            :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
            @click="isDark = !isDark"
          />

          <template #fallback>
            <div class="size-8" />
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const colorMode = useColorMode()
const { isMobile } = usePlatform()
const routeActive = useRouteActive()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.preference = _isDark ? 'dark' : 'light'
  },
})
const items = computed<NavigationMenuItem[]>(() => [
  {
    label: isMobile.value && routeActive.value.path !== '/' ? undefined : 'Home',
    icon: 'i-lucide-book-open',
    to: '/',
    active: routeActive.value.path === '/',
  },
  {
    label: isMobile.value && routeActive.value.path !== '#skills' ? undefined : 'Skills',
    icon: 'i-lucide-pie-chart',
    to: '/#skills',
    active: routeActive.value.path === '#skills',
  },
  {
    label: isMobile.value && routeActive.value.path !== '#projects' ? undefined : 'Projects',
    icon: 'i-lucide-box',
    to: '/#projects',
    active: routeActive.value.path === '#projects',
  },
  {
    label: isMobile.value && routeActive.value.path !== '#experiences' ? undefined : 'Experiences',
    icon: 'i-lucide-spline-pointer',
    to: '/#experiences',
    active: routeActive.value.path === '#experiences',
  },
  {
    label: isMobile.value && routeActive.value.path !== '#educations' ? undefined : 'Educations',
    icon: 'i-lucide-graduation-cap',
    to: '/#educations',
    active: routeActive.value.path === '#educations',
  },
])

// watch(
//   () => route.path,
//   () => {
//     routeActive.value.trigeredBy = 'navbar'
//   }
// )
</script>
