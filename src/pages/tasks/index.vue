<script setup lang="ts">
import { tasksWithProjectsQuery } from '@/utils/supabaseQueries'
import { columns } from '@/utils/tableColumns/tasksColumns'
import type { TaskWithProjects } from '@/utils/supabaseQueries'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<TaskWithProjects | null>(null)

const getTasks = async () => {
  const { data, error, status } = await tasksWithProjectsQuery

  if (error) {
    useErrorStore().setError({ error, customCode: status })
  }

  tasks.value = data
}

await getTasks()
</script>

<template>
  <DataTable v-if="tasks?.length" :columns="columns" :data="tasks" />
</template>
