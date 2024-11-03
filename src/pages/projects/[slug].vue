<script setup lang="ts">
import { projectQuery } from '@/utils/supabaseQueries'
import type { Project } from '@/utils/supabaseQueries'

const route = useRoute('/projects/[slug]')
const project = ref<Project | null>(null)

watch(
  () => project.value?.name,
  () => {
    usePageStore().pageData.title = `Project: ${project.value?.name || ''}`
  },
)

const getProject = async () => {
  const { data, error } = await projectQuery(route.params.slug)

  if (error) {
    console.error(error)
  }

  project.value = data
}

await getProject()
</script>

<template>
  <Table>
    <TableRow>
      <TableHead> Name </TableHead>
      <TableCell> Lorem ipsum dolor sit amet. </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Description </TableHead>
      <TableCell>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad iure qui
        tempora ex nihil, ab reprehenderit dolorem sunt veritatis perferendis?
        Repudiandae quis velit quasi ab natus quia ratione voluptas deserunt
        labore sed distinctio nam fuga fugit vero voluptates placeat aperiam,
        saepe excepturi eos harum consectetur doloremque perspiciatis nesciunt!
        Incidunt, modi.
      </TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Status </TableHead>
      <TableCell>In progress</TableCell>
    </TableRow>
    <TableRow>
      <TableHead> Collaborators </TableHead>
      <TableCell>
        <div class="flex">
          <Avatar
            class="-mr-4 border border-primary transition-transform hover:scale-110"
            v-for="n in 5"
            :key="n"
          >
            <RouterLink
              class="flex h-full w-full items-center justify-center"
              to=""
            >
              <AvatarImage src="" alt="" />
              <AvatarFallback> </AvatarFallback>
            </RouterLink>
          </Avatar>
        </div>
      </TableCell>
    </TableRow>
  </Table>
  <section class="mt-10 flex grow flex-col justify-between gap-5 md:flex-row">
    <div class="flex-1">
      <h2>Tasks</h2>
      <div class="table-container">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Name </TableHead>
              <TableHead> Status </TableHead>
              <TableHead> Due Date </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="n in 5" :key="n">
              <TableCell> Lorem ipsum dolor sit amet. </TableCell>
              <TableCell> In progress </TableCell>
              <TableCell> 22/08/2024 </TableCell>
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
