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
console.log(groupedCollaborators.value)
</script>

<template>
  <DataTable v-if="projects?.length" :columns="columns" :data="projects" />
</template>
