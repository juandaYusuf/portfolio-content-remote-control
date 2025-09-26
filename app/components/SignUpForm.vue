<template>
  <div class="flex h-[max-content] w-full md:w-[20rem]">
    <UForm :schema="schema" :state="state" class="w-full space-y-4" @submit="onSubmit">
      <UFormField label="Name" name="name" required>
        <UInput
          v-model="state.name"
          icon="i-fluent-card-ui-20-regular"
          size="xl"
          placeholder="Name"
          variant="subtle"
          class="w-full font-mono active:scale-[0.99]"
        />
      </UFormField>

      <UFormField label="Username" name="username" required>
        <UInput
          v-model="state.username"
          icon="i-fluent-chart-person-20-regular"
          variant="subtle"
          size="xl"
          placeholder="Username"
          class="w-full font-mono active:scale-[0.99]"
        />
      </UFormField>

      <UFormField label="Password" name="password" required>
        <UInput
          v-model="state.password"
          icon="i-fluent-password-16-regular"
          variant="subtle"
          size="xl"
          placeholder="Password"
          class="w-full font-mono active:scale-[0.99]"
          :type="showPassword ? 'text' : 'password'"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              :aria-pressed="showPassword"
              aria-controls="password"
              @click="showPassword = !showPassword"
            />
          </template>
        </UInput>
        <div class="mt-2 flex flex-col items-center">
          <div class="w-[95%]">
            <UProgress :color="color" :indicator="text" :model-value="score" :max="4" size="sm" />
          </div>
          <div class="mt-2 flex w-full flex-col gap-2 ps-3">
            <p id="password-strength" class="text-sm font-medium">{{ text }}. Contain:</p>

            <ul class="space-y-1" aria-label="Password requirements">
              <li
                v-for="(req, index) in strength"
                :key="index"
                class="flex items-center gap-0.5"
                :class="req.met ? 'text-success' : 'text-muted'"
              >
                <UIcon
                  :name="req.met ? 'i-lucide-circle-check' : 'i-lucide-circle-x'"
                  class="me-2 size-4 shrink-0"
                />

                <span class="text-xs font-light">
                  {{ req.text }}
                  <span class="sr-only font-mono">
                    {{ req.met ? ' - Requirement met' : ' - Requirement not met' }}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </UFormField>

      <UFormField label="Confirm Password" name="confirmPassword" required>
        <UInput
          v-model="state.confirmPassword"
          icon="i-fluent-password-reset-48-regular"
          variant="subtle"
          size="xl"
          placeholder="Confirm password"
          class="w-full font-mono active:scale-[0.99]"
          :type="showConfirmPassword ? 'text' : 'password'"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              :icon="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
              :aria-pressed="showConfirmPassword"
              aria-controls="confirmPassword"
              @click="showConfirmPassword = !showConfirmPassword"
            />
          </template>
        </UInput>
      </UFormField>

      <UButton
        type="submit"
        block
        size="xl"
        variant="soft"
        icon="i-fluent-plug-connected-settings-20-regular"
        class="border border-(--ui-primary) active:scale-[0.99]"
        :color="isSignUpLoading ? 'neutral' : 'primary'"
        :label="isSignUpLoading ? 'Signing you up......' : 'Sign up'"
        :loading="isSignUpLoading"
        :class="{
          'pointer-events-none': isSignUpLoading,
          'border-dashed': isSignUpLoading,
          'border-neutral-500': isSignUpLoading,
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

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { TRPCClientError } from '@trpc/client'

const { $trpc } = useNuxtApp()
const toast = useToast()
const schema = z
  .object({
    name: z.string().min(3, 'Must be at least 3 characters'),
    username: z.string().min(3, 'Must be at least 3 characters'),
    password: z.string().min(8, 'Must be 8 characters'),
    confirmPassword: z.string().min(8, 'Must be at least 8 characters'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      })
    }
  })
const state = reactive<z.output<typeof schema>>({
  name: '',
  username: '',
  password: '',
  confirmPassword: '',
})
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isSignUpLoading = ref(false)
const strength = computed(() => checkStrength(state.password))
const score = computed(() => strength.value.filter((req) => req.met).length)
const color = computed(() => {
  if (score.value === 0) return 'neutral'
  if (score.value <= 1) return 'error'
  if (score.value <= 2) return 'warning'
  if (score.value === 3) return 'warning'
  return 'success'
})

const text = computed(() => {
  if (score.value === 0) return 'Enter a password'
  if (score.value <= 2) return 'Weak password'
  if (score.value === 3) return 'Medium password'
  return 'Strong password'
})

function checkStrength(str: string) {
  const requirements = [
    { regex: /.{8,}/, text: 'Must be at least 8 characters' },
    { regex: /\d/, text: 'Consider adding at least 1 number' },
    { regex: /[a-z]/, text: 'Consider adding at least 1 lowercase letter' },
    { regex: /[A-Z]/, text: 'Consider adding at least 1 uppercase letter' },
  ]

  return requirements.map((req) => ({ met: req.regex.test(str), text: req.text }))
}

async function onSubmit(event: FormSubmitEvent<z.output<typeof schema>>) {
  isSignUpLoading.value = true
  try {
    await $trpc.user.signUp.mutate({
      name: event.data.name,
      username: event.data.username,
      password: event.data.password,
    })
    toast.add({
      title: 'Success',
      description: 'The form has been submitted.',
      color: 'success',
      icon: 'i-fluent-presence-available-12-regular',
    })
  } catch (err: any) {
    if (err instanceof TRPCClientError) {
      if (err.data?.code === 'CONFLICT') {
        toast.add({
          title: 'Failure',
          description: 'Username already exists.',
          color: 'error',
          icon: 'i-fluent-presence-offline-12-regular',
        })
      }
    } else {
      toast.add({
        title: 'Failure',
        description: 'Something went wrong.',
        color: 'error',
        icon: 'i-fluent-presence-offline-12-regular',
      })
    }
    console.error(err)
  } finally {
    Object.keys(state).forEach((key) => ((state as Record<string, string>)[key] = ''))
    isSignUpLoading.value = false
  }
}
</script>
