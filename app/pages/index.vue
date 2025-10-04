<template>
  <div class="relative flex h-dvh flex-col items-center justify-center border">
    <div ref="heroSectionRef" class="pointer-events-none absolute text-xl font-bold opacity-0" />
  <Home/>
  </div>
  <div id="skills" class="relative flex h-dvh flex-col items-center justify-center border">
    <div
      id="skills-content"
      ref="skillsSectionRef"
      class="pointer-events-none absolute text-xl font-bold opacity-0"
    />
  </div>
  <div id="projects" class="relative flex h-dvh flex-col items-center justify-center border">
    <div
      id="projects-content"
      ref="projectsSectionRef"
      class="pointer-events-none absolute text-xl font-bold opacity-0"
    />
  </div>
  <div id="experiences" class="relative flex h-dvh flex-col items-center justify-center border">
    <div
      id="experiences-content"
      ref="experienceSectionRef"
      class="pointer-events-none absolute text-xl font-bold opacity-0"
    />
  </div>
  <div id="educations" class="relative flex h-dvh flex-col items-center justify-center border">
    <div
      id="educations-content"
      ref="educationsSectionRef"
      class="pointer-events-none absolute text-xl font-bold opacity-0"
    />
  </div>
</template>

<script setup lang="ts">
const routeActive = useRouteActive()
const heroSectionRef = ref<HTMLDivElement>()
const skillsSectionRef = ref<HTMLDivElement>()
const projectsSectionRef = ref<HTMLDivElement>()
const experienceSectionRef = ref<HTMLDivElement>()
const educationsSectionRef = ref<HTMLDivElement>()

const intersectInit = () => {
  const options = {
    root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
    scrollMargin: '0px',
    threshold: 1.0,
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!!entry.target.id) {
          const hashUrl = `#${entry.target.id.split('-')[0]}`
          routeActive.value.path = hashUrl
          setHashSilently(hashUrl)
        } else {
          setHashSilently('/')
          routeActive.value.path = '/'
        }
      }
    })
  }, options)

  if (
    heroSectionRef.value &&
    skillsSectionRef.value &&
    projectsSectionRef.value &&
    experienceSectionRef.value &&
    educationsSectionRef.value
  ) {
    observer.observe(heroSectionRef.value)
    observer.observe(skillsSectionRef.value)
    observer.observe(projectsSectionRef.value)
    observer.observe(experienceSectionRef.value)
    observer.observe(educationsSectionRef.value)
  }
}

onMounted(intersectInit)
</script>
