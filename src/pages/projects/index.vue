<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../../database/types'

const projects = ref<Tables<'projects'>[] | null>(null)

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
    <ul v-if="projects?.length">
      <li v-for="project in projects" :key="project.id">
        {{ project.name }}
      </li>
    </ul>
  </div>
</template>
