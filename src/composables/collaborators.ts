import { groupedProfilesQuery } from '@/utils/supabaseQueries'
import type { Projects, TaskWithProjects } from '@/utils/supabaseQueries'
import type { GroupedCollaborators } from '@/types/GroupedCollaborators'

export const useCollaborators = () => {
  const groupedCollaborators = ref<GroupedCollaborators>({})

  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds)

    if (error || !data) return []

    return data
  }

  const getGroupedCollaborators = async (
    items: Projects | TaskWithProjects,
  ) => {
    const filteredItems = items.filter(item => item.collaborators.length)

    const promises = filteredItems.map(item =>
      getProfilesByIds(item.collaborators),
    )

    const results = await Promise.all(promises)

    filteredItems.forEach((item, index) => {
      const collaborators = results[index]
      groupedCollaborators.value[item.id] = collaborators
    })
  }

  return {
    groupedCollaborators,
    getProfilesByIds,
    getGroupedCollaborators,
  }
}
