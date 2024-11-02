<script setup lang="ts">
const route = useRoute('/tasks/[id]')
</script>

<template>
  <div>
    <h1>Task {{ route.params?.id }}</h1>
    <RouterLink to="/">Go to Home</RouterLink>
  </div>
</template>
