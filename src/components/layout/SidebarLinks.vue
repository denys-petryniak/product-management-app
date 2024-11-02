<script setup lang="ts">
interface LinkProp {
  title: string
  to: string
  icon: string
}

interface Props {
  links: LinkProp[]
}

defineProps<Props>()
</script>

<template>
  <RouterLink
    v-for="link in links"
    :key="link.title"
    :to="link.to"
    exactActiveClass="text-primary bg-muted"
    class="mx-2 flex items-center justify-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:text-primary lg:justify-normal"
  >
    <iconify-icon :icon="link.icon"></iconify-icon>
    <span class="hidden text-nowrap lg:block">{{ link.title }}</span>
  </RouterLink>
</template>
