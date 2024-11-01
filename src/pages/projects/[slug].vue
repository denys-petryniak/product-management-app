<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute('/projects/[slug]')
</script>

<template>
  <div>
    <h1>Project {{ route.params?.slug }}</h1>
    <RouterLink to="/">Go to Home</RouterLink>
  </div>
</template>
