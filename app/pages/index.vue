<template>
  <div class="flex h-screen flex-col items-center justify-center gap-4">
    <h1 class="text-2xl font-bold text-(--ui-primary)">Nuxt UI - Starter</h1>

    <div class="flex items-center gap-2">
      <UButton
        label="Documentation"
        icon="i-lucide-square-play"
        to="https://ui.nuxt.com/getting-started/installation/nuxt"
        target="_blank"
      />
      <UButton
        label="GitHub"
        color="neutral"
        variant="outline"
        icon="i-simple-icons-github"
        to="https://github.com/nuxt/ui"
        target="_blank"
      />
    </div>
    <!-- 
      <UButton label="Refetch" @click="refetchHandler" />
      <p v-if="pending">Loading...</p>
      <p v-for="user in usersListData">{{ user }}</p>
      <p>{{ moment.utc(usersAddData?.[0]?.createdAt).local().format('YYYY-MM-DD HH:mm:ss') }}</p>
      <p class="text-red-500" >{{ error }}</p>
      <p>{{ usersListData }}</p>
    -->
    <p>{{ usersAddData }}</p>
    <UTimeline :default-value="2" :items="items" class="w-96" />
  </div>
</template>
<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'
import moment from 'moment'

const { $trpc } = useNuxtApp()
// const { data: usersAddData } = await useAsyncData('addUser', () =>
//   $fetch('/api/user', {
//     method: 'POST',
//     body: {
//       name: 'ucup',
//       email: 'ucup@example.com',
//     },
//   })
// )
const { data: usersAddData, error } = await useAsyncData('addUser', () =>
  $fetch('/api/users', {
    method: 'GET',
  })
)
// const { data: usersListData } = await useAsyncData('userList', () => $trpc.user.list.query(), {
//   server: false,
// })

// const refetchHandler = () => {
//   refresh()
// }

// watch(
//   () => usersAddData.value,
//   (newValue) => {
//     console.log(moment.utc(newValue?.[0]?.createdAt).local().format('YYYY-MM-DD HH:mm:ss'))
//   }
// )
const items = ref<TimelineItem[]>([
  {
    date: 'Mar 15, 2025',
    title: 'Project Kickoff',
    description:
      'Kicked off the project with team alignment. Set up project milestones and allocated resources.',
    icon: 'i-lucide-rocket',
  },
  {
    date: 'Mar 22 2025',
    title: 'Design Phase',
    description:
      'User research and design workshops. Created wireframes and prototypes for user testing.',
    icon: 'i-lucide-palette',
  },
  {
    date: 'Mar 29 2025',
    title: 'Development Sprint',
    description:
      'Frontend and backend development. Implemented core features and integrated with APIs.',
    icon: 'i-lucide-code',
  },
  {
    date: 'Apr 5 2025',
    title: 'Testing & Deployment',
    description: 'QA testing and performance optimization. Deployed the application to production.',
    icon: 'i-lucide-check-circle',
  },
])
</script>
