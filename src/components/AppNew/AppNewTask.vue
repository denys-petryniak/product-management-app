<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import { profilesQuery, projectsQuery } from '@/utils/supabaseQueries'
import type { FormData } from '@/types/TaskFormData'

const isSheetOpen = defineModel<boolean>()

type SelectOption = {
  label: string
  value: number | string
}

type SelectOptions = {
  projects: SelectOption[]
  profiles: SelectOption[]
}

const selectOptions = ref(<SelectOptions>{
  projects: [],
  profiles: [],
})

const getProjectsOptions = async () => {
  const { data: projects, error } = await projectsQuery

  if (error || !projects) return

  projects.forEach(project => {
    selectOptions.value.projects.push({
      label: project.name,
      value: project.id,
    })
  })
}

const getProfilesOptions = async () => {
  const { data: profiles, error } = await profilesQuery

  if (error || !profiles) return

  profiles.forEach(profile => {
    selectOptions.value.profiles.push({
      label: profile.full_name,
      value: profile.id,
    })
  })
}

const getOptions = async () => {
  await Promise.all([getProjectsOptions(), getProfilesOptions()])
}

getOptions()

const createTask = async (formData: FormData) => {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(console.log('Task created', formData))
    }, 2000)
  })
}
</script>

<template>
  <Sheet v-model:open="isSheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new Task</SheetTitle>
      </SheetHeader>
      <FormKit type="form" @submit="createTask" submit-label="Create Task">
        <FormKit
          type="text"
          name="name"
          id="name"
          label="Name"
          placeholder="My new task"
        />
        <FormKit
          type="select"
          name="for"
          id="for"
          label="For"
          placeholder="Select a user"
          :options="selectOptions.profiles"
        />
        <FormKit
          type="select"
          name="project"
          id="project"
          label="Project"
          placeholder="Select a project"
          :options="selectOptions.projects"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="Task description"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>
