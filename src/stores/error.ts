import type { PostgrestError } from '@supabase/supabase-js'
import type { CustomError, ExtendedPostgrestError } from '@/types/Error'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<CustomError | ExtendedPostgrestError | null>(null)

  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError
    customCode: number
  }) => {
    if (typeof error === 'string') {
      activeError.value = new Error(error)
      activeError.value.customCode = customCode
      return
    }

    activeError.value = error
    activeError.value.statusCode = customCode
  }

  // TODO: add clearError() action

  return {
    activeError,
    setError,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot))
}
