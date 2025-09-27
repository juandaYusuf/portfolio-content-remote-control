<template>
  <div class="flex h-[max-content] w-full select-none md:w-[20rem]">
    <UForm :schema="schema" :state="state" class="w-full space-y-4" @submit="onSubmit">
      <UFormField label="Username" name="username">
        <UInput
          v-model="state.username"
          icon="i-fluent-chart-person-20-regular"
          placeholder="Username"
          variant="subtle"
          type="text"
          class="w-full font-mono active:scale-[0.99]"
          size="xl"
          :disabled="isSignInLoading"
          :class="{ 'pointer-events-none': isSignInLoading }"
        />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput
          v-model="state.password"
          icon="i-fluent-password-16-regular"
          placeholder="Password"
          variant="subtle"
          class="w-full font-mono active:scale-[0.99]"
          size="xl"
          :ui="{ trailing: 'pe-1' }"
          :type="showPassword ? 'text' : 'password'"
          :disabled="isSignInLoading"
          :class="{ 'pointer-events-none': isSignInLoading }"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              aria-controls="password"
              :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              :aria-pressed="showPassword"
              @click="showPassword = !showPassword"
            />
          </template>
        </UInput>
      </UFormField>

      <UButton
        type="submit"
        block
        size="xl"
        variant="soft"
        :color="isSignInLoading ? 'neutral' : 'primary'"
        icon="i-fluent-cloud-arrow-up-16-regular"
        class="border border-(--ui-primary) active:scale-[0.99]"
        :label="isSignInLoading ? 'Signing you in......' : 'Sign in'"
        :loading="isSignInLoading"
        :class="{
          'pointer-events-none': isSignInLoading,
          'border-dashed': isSignInLoading,
          'border-neutral-500': isSignInLoading,
        }"
      />
    </UForm>
  </div>
</template>

<style>
/* Hide the password reveal button in Edge */
::-ms-reveal {
  display: none;
}
</style>

<script lang="ts" setup>
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { TRPCClientError } from '@trpc/client'

const { $trpc } = useNuxtApp()
const userAuth = useUserAuth()
const schema = z.object({
  username: z.string(),
  password: z.string(),
})

const state = reactive<Partial<z.output<typeof schema>>>({
  username: '',
  password: '',
})
const showPassword = ref(false)
const isSignInLoading = ref(false)

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<z.output<typeof schema>>) {
  const { username, password } = event.data
  if (username && password) {
    try {
      isSignInLoading.value = true
      const res = await $trpc.user.signIn.mutate({
        username,
        password,
      })
      const { ...user } = res
      localStorage.setItem('user-info', JSON.stringify(user))
      reloadNuxtApp({
        path: '/dashboard',
      })
      userAuth.value.createdAt = user.createdAt
      userAuth.value.id = user.id
      userAuth.value.name = user.name
      userAuth.value.username = user.username
    } catch (error: any) {
      if (error instanceof TRPCClientError) {
        toast.add({ title: 'Error', description: error.message, color: 'error' })
      } else {
        toast.add({ title: 'Error', description: 'An unknown error occurred.', color: 'error' })
      }
    } finally {
      isSignInLoading.value = false
      Object.keys(state).forEach((key) => ((state as Record<string, string>)[key] = ''))
      console.log(userAuth.value)
    }
  }
}

const testRefreshToken = async () => {}
</script>
