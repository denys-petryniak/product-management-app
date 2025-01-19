<script setup lang="ts">
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectsStore()

const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()

const { getGroupedCollaborators, groupedCollaborators } = useCollaborators()

getGroupedCollaborators(projects.value ?? [])

const columnsWithCollaborators = columns(groupedCollaborators)

useMeta({
  title: 'Projects | Pulse',
  description: {
    name: 'description',
    content: 'See all projects in Pulse.',
  },
})
</script>

<template>
  <DataTable
    v-if="projects?.length"
    :columns="columnsWithCollaborators"
    :data="projects"
  />
</template>
