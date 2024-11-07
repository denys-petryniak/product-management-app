import type { PostgrestError } from '@supabase/supabase-js'
import type { CustomError, ExtendedPostgrestError } from '@/types/Error'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<CustomError | ExtendedPostgrestError | null>(null)
  const isCustomError = ref(false)

  const setError = ({
    error,
    customCode = 500,
  }: {
    error: string | Error | PostgrestError
    customCode?: number
  }) => {
    if (typeof error === 'string') isCustomError.value = true

    // Handle generic error
    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? new Error(error) : error
      activeError.value.customCode = customCode

      return
    }

    // Handle Supabase error
    activeError.value = error
    activeError.value.statusCode = customCode
  }

  // TODO: add clearError() action

  return {
    activeError,
    isCustomError,
    setError,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot))
}
