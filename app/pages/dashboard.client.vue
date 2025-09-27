<template>
  <div class="flex h-dvh w-dvw flex-col items-center-safe justify-center-safe gap-4">
    <p class="text-3xl font-bold underline">Dashboard</p>
    <p v-for="user in userList">
      {{ user.id }} | {{ user.name }} | {{ user.username }} | {{ user.createdAt }}
    </p>

    <UButton :loading="isLoading" @click="showUserList" label="Show user" />
    <UButton @click="logout" label="Logout" />
  </div>
</template>

<script lang="ts" setup>
import { TRPCClientError } from '@trpc/client'

const { $trpc } = useNuxtApp()
const toast = useToast()
const userList = ref<Record<string, string>[]>([])
const isLoading = ref(false)
const showUserList = async () => {
  isLoading.value = true
  try {
    const req = await $trpc.user.list.query()
    userList.value = req
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const logout = async () => {
  try {
    const res = await $trpc.auth.logout.query()
    console.log(res)
    if (res.success) {
      reloadNuxtApp({
        path: '/',
      })
    }
  } catch (err) {
    toast.add({ title: 'Error', description: 'Internal Server Error 500', color: 'error' })
    console.error(err)
  }
}
</script>
