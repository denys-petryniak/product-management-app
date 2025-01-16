import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'
import type { TaskFormData } from '@/types/TaskFormData'

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

export const projectsQuery = supabase.from('projects').select()
export type Projects = QueryData<typeof projectsQuery>

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

export const updateProjectQuery = (project = {}, id: number) => {
  return supabase.from('projects').update(project).eq('id', id)
}

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

export const updateTaskQuery = (task = {}, id: number) => {
  return supabase.from('tasks').update(task).eq('id', id)
}

export const createTaskQuery = (task: TaskFormData) => {
  return supabase.from('tasks').insert(task)
}

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

export const profilesQuery = supabase.from('profiles').select(`id, full_name`)
export type Profiles = QueryData<typeof profilesQuery>

export const groupedProfilesQuery = (userIds: string[]) => {
  return supabase
    .from('profiles')
    .select('username, avatar_url, id, full_name')
    .in('id', userIds)
}
export type Collaborators = QueryData<ReturnType<typeof groupedProfilesQuery>>
