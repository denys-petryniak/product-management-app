<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import type { FormData } from '@/types/TaskFormData'

const isSheetOpen = defineModel<boolean>()

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
          :options="[
            { label: 'User 1', value: 1 },
            { label: 'User 2', value: 2 },
          ]"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="Task description"
        />
        <FormKit
          type="select"
          name="project"
          id="project"
          label="Project"
          placeholder="Select a project"
          :options="[
            { label: 'Project 1', value: 1 },
            { label: 'Project 2', value: 2 },
          ]"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>
