import { supabase } from '@/lib/supabaseClient'
import type { QueryData } from '@supabase/supabase-js'

// Fetch tasks with associated project details
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
export const projectQuery = (slug: string) =>
  supabase
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
export type Project = QueryData<ReturnType<typeof projectQuery>>

// Fetch a single task by ID with associated project details
export const taskQuery = (id: string) =>
  supabase
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
export type Task = QueryData<ReturnType<typeof taskQuery>>
