<script setup lang="ts">
const { id } = useRoute('/tasks/[id]').params

const tasksLoader = useTasksStore()

const { task } = storeToRefs(tasksLoader)
const { getTask, updateTask, deleteTask } = tasksLoader

watch(
  () => task.value?.name,
  () => {
    usePageStore().pageData.title = `Task: ${task.value?.name || ''}`
  },
)

await getTask(id)

const { getProfilesByIds } = useCollaborators()

const collaborators = task.value?.collaborators
  ? await getProfilesByIds(task.value?.collaborators)
  : []

const deleteTaskLoading = ref(false)
const router = useRouter()

const handleDeleteTask = async () => {
  deleteTaskLoading.value = true
  await deleteTask()
  deleteTaskLoading.value = false

  router.push({ name: '/tasks/' })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <Table v-if="task">
      <TableRow>
        <TableHead>Name</TableHead>
        <TableCell>
          <AppInPlaceEditText v-model="task.name" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead>Description</TableHead>
        <TableCell>
          <AppInPlaceEditTextarea
            v-model="task.description"
            @commit="updateTask"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead>Assignee</TableHead>
        <TableCell>Lorem ipsum</TableCell>
      </TableRow>
      <TableRow>
        <TableHead>Project</TableHead>
        <TableCell>{{ task.projects?.name }}</TableCell>
      </TableRow>
      <TableRow>
        <TableHead>Status</TableHead>
        <TableCell>
          <AppInPlaceEditStatus v-model="task.status" @commit="updateTask" />
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
      <TableRow class="hover:bg-transparent">
        <TableHead class="pt-4 align-top">Comments</TableHead>
        <TableCell>
          Comments cards goes in here..
          <div
            class="my-2 flex flex-col justify-between rounded-md bg-muted p-3"
          >
            <textarea
              placeholder="Add your comment.."
              class="prose-sm prose dark:prose-invert w-full max-w-full overflow-y-auto rounded border border-muted bg-background p-3 hover:border-muted"
            >
            </textarea>
            <div class="mt-3 flex justify-between">
              <Button>Comment</Button>
              <div class="flex gap-4">
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:paperclip"></iconify-icon>
                  <span class="sr-only">Attach file</span>
                </button>
                <button variant="ghost" @click.prevent>
                  <iconify-icon icon="lucide:image-up"></iconify-icon>
                  <span class="sr-only">Upload image</span>
                </button>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </Table>
  </div>
  <Button
    variant="destructive"
    class="mt-3 w-full max-w-40 self-end"
    @click="handleDeleteTask"
  >
    <Transition name="scale" mode="out-in">
      <iconify-icon
        v-if="deleteTaskLoading"
        icon="lucide:loader-circle"
        class="mr-1 animate-spin"
      ></iconify-icon>
      <iconify-icon v-else icon="lucide:trash-2" class="mr-1"></iconify-icon>
    </Transition>
    Delete Task
  </Button>
</template>

<style>
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
