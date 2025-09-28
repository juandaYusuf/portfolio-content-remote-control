<template>
  <UApp :toaster="{ position: 'top-right' }">
    <NuxtLayout />
    <NuxtPage />
  </UApp>
</template>
<style>
html {
  scroll-behavior: smooth;
}
::-webkit-scrollbar {
  display: none;
}
</style>
