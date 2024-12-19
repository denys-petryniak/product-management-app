import type { Collaborators } from '@/utils/supabaseQueries'

export type GroupedCollaborators = {
  [key: string]: Collaborators
}
