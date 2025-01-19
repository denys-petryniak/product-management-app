<script setup lang="ts">
const { trackAuthChanges } = useAuthStore()

onMounted(() => {
  trackAuthChanges()
})

const errorStore = useErrorStore()

onErrorCaptured(error => {
  errorStore.setError({ error })
})

const { user } = storeToRefs(useAuthStore())

const AuthLayout = defineAsyncComponent(
  () => import('./components/Layout/main/AuthLayout.vue'),
)
const GuestLayout = defineAsyncComponent(
  () => import('./components/Layout/main/GuestLayout.vue'),
)
</script>

<template>
  <Component :is="user ? AuthLayout : GuestLayout">
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
  </Component>
</template>
