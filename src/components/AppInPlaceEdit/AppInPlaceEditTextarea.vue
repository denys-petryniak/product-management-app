<script setup lang="ts">
const value = defineModel<string>()

defineEmits(['commit'])
</script>

<template>
  <textarea
    v-model="value"
    @blur="$emit('commit')"
    class="h-20 w-full bg-transparent p-1 focus:rounded-md focus:border-none focus:bg-gray-800 focus:outline-none"
  />
</template>
