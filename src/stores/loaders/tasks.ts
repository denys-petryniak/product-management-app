import { useMemoize } from '@vueuse/core'
import {
  taskQuery,
  tasksWithProjectsQuery,
  updateTaskQuery,
  deleteTaskQuery,
} from '@/utils/supabaseQueries'
import type { Task, TaskWithProjects } from '@/utils/supabaseQueries'

export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TaskWithProjects | null>(null)
  const task = ref<Task | null>(null)

  const loadTasks = useMemoize(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (key: string) => await tasksWithProjectsQuery,
  )
  const loadTask = useMemoize(async (id: string) => await taskQuery(id))

  interface ValidateCacheParams {
    ref: typeof tasks | typeof task
    query: typeof tasksWithProjectsQuery | typeof taskQuery
    key: string
    loaderFn: typeof loadTasks | typeof loadTask
  }

  // TODO: move to utils
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

  const getTasks = async () => {
    tasks.value = null

    const { data, error, status } = await loadTasks('tasks')

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    if (data) {
      tasks.value = data
    }

    validateCache({
      ref: tasks,
      query: tasksWithProjectsQuery,
      key: 'tasks',
      loaderFn: loadTasks,
    })
  }

  const getTask = async (id: string) => {
    task.value = null

    const { data, error, status } = await loadTask(id)

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }

    if (data) {
      task.value = data
    }

    validateCache({
      ref: task,
      query: taskQuery,
      key: id,
      loaderFn: loadTask,
    })
  }

  const updateTask = async () => {
    if (!task.value) return

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projects, id, ...taskProperties } = task.value

    const { error, status } = await updateTaskQuery(taskProperties, id)

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
  }

  const deleteTask = async () => {
    if (!task.value) return

    const { error, status } = await deleteTaskQuery(task.value.id)

    if (error) {
      useErrorStore().setError({ error, customCode: status })
    }
  }

  return {
    tasks,
    task,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot))
}
