<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const projects = ref<any[] | null>(null)

// TODO: use top-level await instead of IIFE (?)
;(async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) {
    console.error(error)
  }

  projects.value = data

  console.log('projects', projects.value)
})()
</script>

<template>
  <div>
    <h1>Projects Page</h1>
    <RouterLink to="/">Go to Home</RouterLink>
    <pre>{{ projects }}</pre>
  </div>
</template>
