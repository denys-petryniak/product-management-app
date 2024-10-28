<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

const getProjects = async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) {
    console.error(error)
  }

  console.log(data)
}

await getProjects()
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <RouterLink :to="{ name: '/projects/' }">Go to Projects</RouterLink>
  </div>
</template>
