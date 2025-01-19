<script setup lang="ts">
const { slug } = useRoute('/projects/[slug]').params

const projectsLoader = useProjectsStore()

const { project } = storeToRefs(projectsLoader)
const { getProject, updateProject } = projectsLoader

watch(
  () => project.value?.name,
  () => {
    usePageStore().pageData.title = `Project: ${project.value?.name || ''}`
  },
)

await getProject(slug)

const { getProfilesByIds } = useCollaborators()

const collaborators = project.value?.collaborators
  ? await getProfilesByIds(project.value?.collaborators)
  : []
</script>

<template>
  <div>
    <Table v-if="project">
      <TableRow>
        <TableHead>Name</TableHead>
        <TableCell>
          <AppInPlaceEditText v-model="project.name" @commit="updateProject" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead>Description</TableHead>
        <TableCell>
          <AppInPlaceEditTextarea
            v-model="project.description"
            @commit="updateProject"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead>Status</TableHead>
        <TableCell>
          <AppInPlaceEditStatus
            v-model="project.status"
            @commit="updateProject"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead>Collaborators</TableHead>
        <TableCell>
          <div class="flex">
            <Avatar
              class="-mr-4 border border-primary transition-transform hover:scale-110"
              v-for="collaborator in collaborators"
              :key="collaborator.id"
            >
              <RouterLink
                class="flex h-full w-full items-center justify-center"
                :to="{
                  name: '/users/[username]',
                  params: { username: collaborator.username },
                }"
              >
                <AvatarImage
                  :src="collaborator.avatar_url || ''"
                  :alt="collaborator.username"
                />
                <AvatarFallback></AvatarFallback>
              </RouterLink>
            </Avatar>
          </div>
        </TableCell>
      </TableRow>
    </Table>
    <section
      v-if="project"
      class="mt-10 flex grow flex-col justify-between gap-5 md:flex-row"
    >
      <div class="flex-1">
        <h2>Tasks</h2>
        <div class="table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="task in project.tasks" :key="task.id">
                <TableCell class="p-0">
                  <RouterLink
                    :to="{
                      name: '/tasks/[id]',
                      params: { id: task.id },
                    }"
                    class="block p-4 text-left hover:bg-muted"
                  >
                    {{ task.name }}
                  </RouterLink>
                </TableCell>
                <TableCell>
                  <AppInPlaceEditStatus readonly :modelValue="task.status" />
                </TableCell>
                <TableCell>{{ task.due_date }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div class="flex-1">
        <h2>Documents</h2>
        <div class="table-container">
          <p class="px-4 py-3 text-sm font-semibold text-muted-foreground">
            This project doesn't have documents yet...
          </p>
          <!-- <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Visibility </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> Private </TableCell>
            </TableRow>
          </TableBody>
        </Table> -->
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
th {
  @apply w-[100px];
}

h2 {
  @apply mb-4 w-fit text-lg font-semibold;
}

.table-container {
  @apply h-80 overflow-hidden overflow-y-auto rounded-md bg-slate-900;
}
</style>
