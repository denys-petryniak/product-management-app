<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

const authStore = useAuthStore()

onMounted(async () => {
  const { data } = await supabase.auth.getSession()

  if (data.session?.user) {
    await authStore.setAuth(data.session)
  }
})

const errorStore = useErrorStore()

onErrorCaptured(error => {
  errorStore.setError({ error })
})
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="errorStore.activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <template v-if="Component">
        <Suspense :timeout="0">
          <component :is="Component" :key="route.name"></component>
          <template #fallback>
            <span>Loading...</span>
          </template>
        </Suspense>
      </template>
    </RouterView>
  </AuthLayout>
</template>
