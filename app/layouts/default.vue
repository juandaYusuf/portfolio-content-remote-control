<template>
  <div
    class="fixed bottom-0 z-50 flex h-[max-content] w-full items-center justify-center gap-2 md:top-0 md:px-2 md:pt-2"
  >
    <div
      class="flex h-16 w-screen items-center justify-between gap-2 border-t border-neutral-300 bg-neutral-200/50 px-2 shadow backdrop-blur-lg md:h-[max-content] md:w-[max-content] md:rounded-full md:border dark:border-neutral-700 dark:bg-neutral-800/50"
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
          <UPopover arrow>
            <UButton icon="i-lucide-swatch-book" color="neutral" variant="ghost" />

            <template #content>
              <div class="flex w-68 flex-col gap-2 p-2">
                <!-- Dark mode switch -->
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold opacity-80">Theme</p>
                  <UFieldGroup>
                    <UButton
                      class="w-10"
                      block
                      size="sm"
                      color="neutral"
                      icon="i-lucide-sun"
                      :variant="colorMode.preference === 'light' ? 'subtle' : 'outline'"
                      :class="{ 'text-primary': colorMode.preference === 'light' }"
                      @click="colorMode.preference = 'light'"
                    />
                    <UButton
                      class="w-10"
                      block
                      size="sm"
                      color="neutral"
                      icon="i-lucide-moon"
                      :variant="colorMode.preference === 'dark' ? 'subtle' : 'outline'"
                      :class="{ 'text-primary': colorMode.preference === 'dark' }"
                      @click="colorMode.preference = 'dark'"
                    />
                    <UButton
                      class="w-10"
                      block
                      size="sm"
                      color="neutral"
                      icon="i-lucide-monitor"
                      :variant="colorMode.preference === 'system' ? 'subtle' : 'outline'"
                      :class="{ 'text-primary': colorMode.preference === 'system' }"
                      @click="colorMode.preference = 'system'"
                    />
                  </UFieldGroup>
                </div>
                <USeparator />
                <!-- Primary colors  -->
                <div class="flex flex-col gap-1">
                  <p class="text-sm font-semibold opacity-80">Primary</p>
                  <div class="flex w-full flex-wrap justify-center gap-1">
                    <UButton
                      v-for="primaryColor in primaryColors"
                      size="xs"
                      color="neutral"
                      class="w-20"
                      @click="changePrimaryColor(primaryColor.color)"
                      :variant="
                        appConfig.ui.colors.primary === primaryColor.color ? 'subtle' : 'outline'
                      "
                      :class="
                        appConfig.ui.colors.primary === primaryColor.color
                          ? 'opacity-100'
                          : 'opacity-70'
                      "
                    >
                      <div
                        class="size-2 rounded-full"
                        :style="{ backgroundColor: primaryColor.hexCode }"
                      />
                      <p class="text-xs">{{ primaryColor.label }}</p>
                    </UButton>
                  </div>
                </div>
                <USeparator />
                <!-- Primary colors  -->
                <div class="flex flex-col gap-1">
                  <p class="text-sm font-semibold opacity-80">Background intensity</p>
                  <div class="mb-4 flex w-full flex-wrap justify-center gap-1">
                    <div class="mb-1 flex w-full items-center justify-between opacity-50">
                      <p class="text-xs">Cool</p>
                      <p class="text-xs">Warm</p>
                    </div>
                    <USlider
                      tooltip
                      size="xs"
                      color="neutral"
                      :step="25"
                      :default-value="backgroundIntensitySlider"
                      @update:modelValue="changeBackgroundIntensity"
                    />
                  </div>
                </div>
              </div>
            </template>
          </UPopover>

          <template #fallback>
            <div class="flex size-8 items-center justify-center">
              <UIcon name="i-svg-spinners-12-dots-scale-rotate" />
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui'

const primaryColors = [
  { label: 'Black', color: 'black', hexCode: '#000000' },
  { label: 'Red', color: 'red', hexCode: '#ef4444' },
  { label: 'Orange', color: 'orange', hexCode: '#f97316' },
  { label: 'Amber', color: 'amber', hexCode: '#f59e0b' },
  { label: 'Yellow', color: 'yellow', hexCode: '#eab308' },
  { label: 'Lime', color: 'lime', hexCode: '#84cc16' },
  { label: 'Green', color: 'green', hexCode: '#22c55e' },
  { label: 'Emerald', color: 'emerald', hexCode: '#10b981' },
  { label: 'Teal', color: 'teal', hexCode: '#14b8a6' },
  { label: 'Cyan', color: 'cyan', hexCode: '#06b6d4' },
  { label: 'Sky', color: 'sky', hexCode: '#0ea5e9' },
  { label: 'Blue', color: 'blue', hexCode: '#3b82f6' },
  { label: 'Indigo', color: 'indigo', hexCode: '#6366f1' },
  { label: 'Violet', color: 'violet', hexCode: '#8b5cf6' },
  { label: 'Purple', color: 'purple', hexCode: '#a855f7' },
  { label: 'Fuchsia', color: 'fuchsia', hexCode: '#d946ef' },
  { label: 'Pink', color: 'pink', hexCode: '#ec4899' },
  { label: 'Rose', color: 'rose', hexCode: '#f43f5e' },
]
const bgIntensityColors = [
  { key: 0, label: 'Slate', color: 'slate', hexCode: '#64748b' },
  { key: 25, label: 'Gray', color: 'gray', hexCode: '#6b7280' },
  { key: 50, label: 'Zinc', color: 'zinc', hexCode: '#71717a' },
  { key: 75, label: 'Neutral', color: 'neutral', hexCode: '#737373' },
  { key: 100, label: 'Stone', color: 'stone', hexCode: '#78716c' },
]

const appConfig = useAppConfig()
const colorMode = useColorMode()
const { isMobile } = usePlatform()
const routeActive = useRouteActive()
const backgroundIntensitySlider = ref(
  bgIntensityColors.find((item) => item.color === appConfig.ui.colors.neutral)?.key ?? 0
)

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

const changePrimaryColor = (color: string | null) => {
  if (!!color) {
    localStorage.setItem('primary-color', color)
    appConfig.ui.colors.primary = color ?? 'emerald'
  } else {
    appConfig.ui.colors.primary = 'emerald'
  }
}

const changeBackgroundIntensity = (e: any) => {
  if (typeof e === 'number') {
    bgIntensityColors.forEach((item) => {
      if (item.key === e) {
        localStorage.setItem('bg-intensity-color', item.color)
        appConfig.ui.colors.neutral = item.color ?? 'emerald'
      }
    })
  }
}
</script>
