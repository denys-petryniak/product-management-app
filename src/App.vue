<script setup lang="ts">
const { trackAuthChanges } = useAuthStore()

onMounted(() => {
  trackAuthChanges()
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
