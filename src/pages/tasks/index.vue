<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import type { Tables } from '../../../database/types'

const tasks = ref<Tables<'tasks'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('tasks').select()

  if (error) {
    console.error(error)
  }

  tasks.value = data
})()
</script>

<template>
  <div>
    <h1>Tasks Page</h1>
    <RouterLink to="/">Go to Home</RouterLink>
    <ul v-if="tasks?.length">
      <li v-for="task in tasks" :key="task.id">
        {{ task.name }}
      </li>
    </ul>
  </div>
</template>
