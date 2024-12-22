import {
  projectQuery,
  projectsQuery,
  updateProjectQuery,
} from '@/utils/supabaseQueries'
import { useMemoize } from '@vueuse/core'
import type { Project, Projects } from '@/utils/supabaseQueries'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<Project | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => await projectsQuery)
  const loadProject = useMemoize(
    async (slug: string) => await projectQuery(slug),
  )

  interface ValidateCacheParams {
    ref: typeof projects | typeof project
    query: typeof projectsQuery | typeof projectQuery
    key: string
    loaderFn: typeof loadProjects | typeof loadProject
  }

  const validateCache = ({
    ref,
    query,
    key,
    loaderFn,
  }: ValidateCacheParams) => {
    if (!ref.value) return

    const resolvedQuery = typeof query === 'function' ? query(key) : query

    // "stale-while-revalidate" approach
    resolvedQuery.then(({ data, error }) => {
      if (JSON.stringify(data) === JSON.stringify(ref.value)) {
        return
      } else {
        loaderFn.delete(key)

        if (!error && data) {
          ref.value = data
        }
      }
    })
  }

  const getProjects = async () => {
    projects.value = null

    const { data, error, status } = await loadProjects('projects')

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    if (data) {
      projects.value = data
    }

    validateCache({
      ref: projects,
      query: projectsQuery,
      key: 'projects',
      loaderFn: loadProjects,
    })
  }

  const getProject = async (slug: string) => {
    project.value = null

    const { data, error, status } = await loadProject(slug)

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    if (data) {
      project.value = data
    }

    validateCache({
      ref: project,
      query: projectQuery,
      key: slug,
      loaderFn: loadProject,
    })
  }

  const updateProject = async () => {
    if (!project.value) return

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tasks, id, ...projectProperties } = project.value

    const { error, status } = await updateProjectQuery(projectProperties, id)

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
  }

  return {
    projects,
    project,
    getProjects,
    getProject,
    updateProject,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectsStore, import.meta.hot))
}
