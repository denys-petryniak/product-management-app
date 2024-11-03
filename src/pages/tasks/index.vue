<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { tasksWithProjectsQuery } from '@/utils/supabaseQueries'
import type { TaskWithProjects } from '@/utils/supabaseQueries'
import type { ColumnDef } from '@tanstack/vue-table'

usePageStore().pageData.title = 'Tasks'

const tasks = ref<TaskWithProjects | null>(null)

const getTasks = async () => {
  const { data, error } = await tasksWithProjectsQuery

  if (error) {
    console.error(error)
  }

  tasks.value = data
}

await getTasks()

const columns: ColumnDef<TaskWithProjects[0]>[] = [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/tasks/${row.original.id}`,
          class: 'block w-full text-left font-medium hover:bg-muted',
        },
        () => row.getValue('name'),
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        row.getValue('status'),
      )
    },
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        row.getValue('due_date'),
      )
    },
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) => {
      return row.original.projects
        ? h(
            RouterLink,
            {
              to: `/projects/${row.original.projects.slug}`,
              class: 'block w-full text-left font-medium hover:bg-muted',
            },
            () => row.original.projects?.name,
          )
        : ''
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        JSON.stringify(row.getValue('collaborators')),
      )
    },
  },
]
</script>

<template>
  <DataTable v-if="tasks?.length" :columns="columns" :data="tasks" />
</template>
