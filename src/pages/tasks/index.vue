<script setup lang="ts">
import { columns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'Tasks'

const tasksLoader = useTasksStore()

const { tasks } = storeToRefs(tasksLoader)
const { getTasks } = tasksLoader

await getTasks()

const { getGroupedCollaborators, groupedCollaborators } = useCollaborators()

getGroupedCollaborators(tasks.value ?? [])

const columnsWithCollaborators = columns(groupedCollaborators)

useMeta({
  title: 'Tasks | Pulse',
})
</script>

<template>
  <DataTable
    v-if="tasks?.length"
    :columns="columnsWithCollaborators"
    :data="tasks"
  />
</template>
