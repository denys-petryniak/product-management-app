import { RouterLink } from 'vue-router'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import type { TaskWithProjects } from '@/utils/supabaseQueries'
import type { GroupedCollaborators } from '@/types/GroupedCollaborators'

export const columns = (
  collaborators: Ref<GroupedCollaborators>,
): ColumnDef<TaskWithProjects[0]>[] => [
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
        h(AppInPlaceEditStatus, {
          readonly: true,
          modelValue: row.original.status,
        }),
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
        collaborators.value[row.original.id]
          ? collaborators.value[row.original.id].map(collaborator => {
              return h(
                RouterLink,
                { to: `/users/${collaborator.username}` },
                () => {
                  return h(
                    Avatar,
                    { class: 'hover:scale-110 transition-transform' },
                    () =>
                      h(AvatarImage, { src: collaborator.avatar_url || '' }),
                  )
                },
              )
            })
          : row.original.collaborators.map(() => {
              return h(Avatar, { class: 'animate-pulse' }, () =>
                h(AvatarFallback),
              )
            }),
      )
    },
  },
]
