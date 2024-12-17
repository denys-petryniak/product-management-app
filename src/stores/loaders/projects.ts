import { projectsQuery } from '@/utils/supabaseQueries'
import { useMemoize } from '@vueuse/core'
import type { Projects } from '@/utils/supabaseQueries'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => await projectsQuery)

  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    projects.value = data
  }

  return {
    projects,
    getProjects,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectsStore, import.meta.hot))
}
