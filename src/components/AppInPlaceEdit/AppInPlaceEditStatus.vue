<script setup lang="ts">
const value = defineModel<'in-progress' | 'completed'>()
</script>

<template>
  <div class="cursor-pointer text-2xl">
    <iconify-icon
      v-if="value === 'completed'"
      icon="lucide:circle-check"
      class="text-green-500"
    />
    <iconify-icon v-else icon="lucide:circle-dot" class="text-gray-500" />
  </div>
</template>
