import type { CustomError } from '@/types/Error'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError>(null)

  const setError = ({
    error,
    customCode,
  }: {
    error: string
    customCode: number
  }) => {
    activeError.value = new Error(error)
    activeError.value.customCode = customCode
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
