<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import {
  createTaskQuery,
  profilesQuery,
  projectsQuery,
} from '@/utils/supabaseQueries'
import type { TaskFormData } from '@/types/TaskFormData'

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

const { profile } = storeToRefs(useAuthStore())

const createTask = async (formData: TaskFormData) => {
  const task = {
    ...formData,
    collaborators: [profile.value!.id],
  }

  const { error, status } = await createTaskQuery(task)

  if (error) {
    useErrorStore().setError({ error, customCode: status })
  }

  isSheetOpen.value = false
}
</script>

<template>
  <Sheet v-model:open="isSheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new Task</SheetTitle>
      </SheetHeader>
      <FormKit
        type="form"
        submit-label="Create Task"
        :config="{ validationVisibility: 'submit' }"
        @submit="createTask"
      >
        <FormKit
          type="text"
          name="name"
          id="name"
          label="Name"
          placeholder="My new task"
          validation="required|length:1,255"
        />
        <FormKit
          type="select"
          name="profile_id"
          id="profile_id"
          label="User"
          placeholder="Select a user"
          validation="required"
          :options="selectOptions.profiles"
        />
        <FormKit
          type="select"
          name="project_id"
          id="project_id"
          label="Project"
          placeholder="Select a project"
          validation="required"
          :options="selectOptions.projects"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="Task description"
          validation="length:1,500"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>
