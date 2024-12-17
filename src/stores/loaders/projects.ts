import { projectsQuery } from '@/utils/supabaseQueries'
import { useMemoize } from '@vueuse/core'
import type { Projects } from '@/utils/supabaseQueries'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => await projectsQuery)

  const validateCache = () => {
    if (projects.value?.length) {
      // "stale-while-revalidate" approach
      projectsQuery.then(({ data }) => {
        if (JSON.stringify(data) === JSON.stringify(projects.value)) {
          console.log('Cached and fresh data')
          return
        } else {
          console.log('Something has changed')
          loadProjects.delete('projects')
        }
      })
    }
  }

  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    projects.value = data

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
