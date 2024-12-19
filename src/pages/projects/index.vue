<script setup lang="ts">
import { useCollaborators } from '@/composables/collaborators'
import { columns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectsStore()

const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()

const { getGroupedCollaborators, groupedCollaborators } = useCollaborators()

await getGroupedCollaborators(projects.value)

const columnsWithCollaborators = columns(groupedCollaborators)
</script>

<template>
  <DataTable
    v-if="projects?.length"
    :columns="columnsWithCollaborators"
    :data="projects"
  />
</template>
