import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

// Fetch tasks with associated project details
// FIXME: https://github.com/pnpm/pnpm/issues/6089
export const tasksWithProjectsQuery = supabase.from('tasks').select(`
  *,
  projects (
    id,
    name,
    slug
  )
`)
export type TaskWithProjects = QueryData<typeof tasksWithProjectsQuery>

// Fetch all projects
export const projectsQuery = supabase.from('projects').select()
export type Projects = QueryData<typeof projectsQuery>

// Fetch a single project by slug with associated tasks
export const projectQuery = (slug: string) => {
  return supabase
    .from('projects')
    .select(
      `
    *,
    tasks (
      id,
      name,
      status,
      due_date
    )
    `,
    )
    .eq('slug', slug)
    .single()
}
export type Project = QueryData<ReturnType<typeof projectQuery>>

// Fetch a single task by ID with associated project details
export const taskQuery = (id: string) => {
  return supabase
    .from('tasks')
    .select(
      `
    *,
    projects (
      id,
      name,
      slug
    )
    `,
    )
    .eq('id', id)
    .single()
}
export type Task = QueryData<ReturnType<typeof taskQuery>>

// Fetch a single profile by ID
export const profileQuery = ({
  column,
  value,
}: {
  column: string
  value: string
}) => {
  return supabase.from('profiles').select().eq(column, value).single()
}
export type Profile = QueryData<ReturnType<typeof profileQuery>>

// Fetch profiles grouped by user IDs
export const groupedProfilesQuery = (userIds: string[]) => {
  return supabase
    .from('profiles')
    .select('username, avatar_url, id, full_name')
    .in('id', userIds)
}
export type Collaborators = QueryData<ReturnType<typeof groupedProfilesQuery>>
