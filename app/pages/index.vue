<template>
  <div class="mb-[0.25rem] flex h-dvh flex-col items-center justify-center border">
    <p ref="heroSectionRef" class="text-xl font-bold">HERO</p>
  </div>
  <div id="skills" class="flex h-dvh flex-col items-center justify-center border">
    <p id="skills-content" ref="skillsSectionRef" class="text-xl font-bold">SKILLS</p>
  </div>
  <div id="projects" class="flex h-dvh flex-col items-center justify-center border">
    <p id="projects-content" ref="projectsSectionRef" class="text-xl font-bold">PROJECTS</p>
  </div>
  <div id="experiences" class="flex h-dvh flex-col items-center justify-center border">
    <p id="experiences-content" ref="experienceSectionRef" class="text-xl font-bold">EXPERIENCES</p>
  </div>
  <div id="educations" class="flex h-dvh flex-col items-center justify-center border">
    <p id="educations-content" ref="educationsSectionRef" class="text-xl font-bold">EDUCATIONS</p>
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
