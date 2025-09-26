// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['trpc-nuxt'],
  },
  runtimeConfig: {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
  },
  modules: ['@nuxt/ui', '@nuxt/eslint', '@nuxt/image', '@nuxt/scripts'],

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-07-16',
})
