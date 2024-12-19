import { groupedProfilesQuery } from '@/utils/supabaseQueries'

export const useCollaborators = () => {
  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds)

    if (error || !data) return []

    return data
  }

  return {
    getProfilesByIds,
  }
}
