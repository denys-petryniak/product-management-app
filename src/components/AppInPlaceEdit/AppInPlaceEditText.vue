<script setup lang="ts">
const value = defineModel()
</script>

<template>
  <input
    type="text"
    v-model="value"
    class="w-full bg-transparent p-1 focus:rounded-md focus:border-none focus:bg-gray-800 focus:outline-none"
  />
</template>
