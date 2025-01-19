<script setup lang="ts">
const { pageData } = storeToRefs(usePageStore())

const isTaskSheetOpen = ref(false)

const { isMenuOpen } = useMenu()
</script>

<template>
  <Sidebar @task-selected="isTaskSheetOpen = true" />
  <AppNewTask v-model="isTaskSheetOpen" />
  <div
    class="flex flex-col transition-[margin]"
    :class="{ 'ml-52': isMenuOpen, 'ml-24': !isMenuOpen }"
  >
    <TopNavbar />
    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
      </div>
      <slot />
    </main>
  </div>
</template>
