<script setup lang="ts">
const value = defineModel()

defineEmits(['commit'])
</script>

<template>
  <input
    type="text"
    v-model="value"
    @blur="$emit('commit')"
    @keyup.enter="($event.target as HTMLInputElement).blur()"
    class="w-full bg-transparent p-1 focus:rounded-md focus:border-none focus:bg-gray-800 focus:outline-none"
  />
</template>
