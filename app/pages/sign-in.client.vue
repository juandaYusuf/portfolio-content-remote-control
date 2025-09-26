<template>
  <main class="flex h-dvh w-dvw items-center justify-center">
    <div class="flex w-full min-w-[22rem] flex-col gap-4 p-4 md:w-[22rem]">
      <div
        class="flex w-full flex-col items-center justify-center gap-1 border-b border-dashed border-white/20 pb-4 md:w-auto"
      >
        <h1 class="text-3xl font-bold drop-shadow-xl">Sign In</h1>
        <h3 class="text-center opacity-65">
          Sign in to your account to get full access to managing content on the website
        </h3>
      </div>
      <SignInForm />
    </div>
  </main>
</template>

<script lang="ts" setup></script>
