import { projectsQuery } from '@/utils/supabaseQueries'
import { useMemoize } from '@vueuse/core'
import type { Projects } from '@/utils/supabaseQueries'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects>([])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => await projectsQuery)

  const validateCache = () => {
    if (!projects.value?.length) return

    // "stale-while-revalidate" approach
    projectsQuery.then(({ data, error }) => {
      if (JSON.stringify(data) === JSON.stringify(projects.value)) {
        return
      } else {
        loadProjects.delete('projects')

        if (!error && data) {
          projects.value = data
        }
      }
    })
  }

  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    if (data) {
      projects.value = data
    }

    validateCache()
  }

  return {
    projects,
    getProjects,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectsStore, import.meta.hot))
}
