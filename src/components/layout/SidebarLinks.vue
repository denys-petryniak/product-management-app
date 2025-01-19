<script setup lang="ts">
interface LinkProp {
  title: string
  icon: string
  to?: string
}

interface Props {
  links: LinkProp[]
}

defineProps<Props>()

const emits = defineEmits<{
  actionClicked: [title: string]
}>()

const emitActionClicked = (linkTitle: string) => {
  emits('actionClicked', linkTitle)
}

const { isMenuOpen } = useMenu()
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      :to="link.to"
      exactActiveClass="text-primary bg-muted"
      class="nav-link"
      :class="{ 'justify-normal': isMenuOpen, 'justify-center': !isMenuOpen }"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span
        class="text-nowrap"
        :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
        >{{ link.title }}</span
      >
    </RouterLink>
    <div
      v-else
      class="nav-link cursor-pointer"
      :class="{ 'justify-normal': isMenuOpen, 'justify-center': !isMenuOpen }"
      @click="emitActionClicked(link.title)"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span
        class="text-nowrap"
        :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
      >
        {{ link.title }}
      </span>
    </div>
  </template>
</template>

<style scoped>
.nav-link {
  @apply mx-2 flex items-center gap-3 rounded-lg px-4 py-2 text-muted-foreground transition-colors hover:text-primary;
}
</style>
