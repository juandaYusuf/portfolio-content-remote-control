<template>
  <div class="flex flex-col items-center justify-center gap-4 h-screen">
    <h1 class="font-bold text-2xl text-(--ui-primary)">Nuxt UI - Starter</h1>

    <div class="flex items-center gap-2">
      <UButton label="Documentation" icon="i-lucide-square-play" to="https://ui.nuxt.com/getting-started/installation/nuxt" target="_blank" />
      <p>{{ data?.greeting }}</p>
      <UButton label="GitHub" color="neutral" variant="outline" icon="i-simple-icons-github" to="https://github.com/nuxt/ui" target="_blank" />
    </div>
    <UButton label="Refetch" @click="refetchHandler" />
    <p v-if="pending">Loading...</p>
  </div>
</template>
<script setup lang="ts">
const { $trpc } = useNuxtApp()
const randomNumber = Math.floor(Math.random() * 100) + 1
// const { data, refresh, pending } = await useAsyncData("apalaaah", () => $trpc.trpcTest.query({ name: `Random Number: ${Math.floor(Math.random() * 100) + 1}` }), {
//   server: false,
// })

const { data, error, pending, refresh } = await useAsyncData("greet", () => trpcDataFetcherSSR("trpcTest", "POST", { name: "UCUP JAGOAN CODING" }), {})
// const { data, error, pending, refresh } = await useAsyncData("greet", () => trpcDataFetcherSSR("hello", "POST", { text: "UCUP JAGOAN CODING" }), {})

// const { data } = useAsyncData("greet", () => $trpc.trpcTest.query({ name: "UCUP JAGOAN CODING" }), {
//   server: false,
// })
const refetchHandler = () => {
  refresh()
}
</script>
