import { RouterLink } from 'vue-router'
import type { ColumnDef } from '@tanstack/vue-table'
import type { Projects } from '@/utils/supabaseQueries'
import type { GroupedCollaborators } from '@/types/GroupedCollaborators'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue'

export const columns = (
  collaborators: Ref<GroupedCollaborators>,
): ColumnDef<Projects[0]>[] => [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
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
        h(AppInPlaceEditStatus, { modelValue: row.original.status }),
      )
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'h-20 flex items-center text-left font-medium' },
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
