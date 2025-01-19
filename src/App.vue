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

useMeta({
  title: 'Pulse',
  description: {
    name: 'description',
    content:
      'Pulse is a project management tool that helps you organize your work.',
  },
})
</script>

<template>
  <metainfo></metainfo>
  <Transition name="fade" mode="out-in">
    <Component :is="user ? AuthLayout : GuestLayout" :key="user?.id">
      <AppErrorPage v-if="errorStore.activeError" />
      <RouterView v-else v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <div v-if="Component" :key="route.path">
            <Suspense :timeout="0">
              <Component :is="Component" />
              <template #fallback>
                <div
                  class="absolute left-1/2 top-1/2 z-50 flex h-screen w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center bg-background bg-opacity-90"
                >
                  <iconify-icon
                    icon="lucide:loader-circle"
                    class="animate-spin text-6xl"
                  />
                </div>
              </template>
            </Suspense>
          </div>
        </Transition>
      </RouterView>
    </Component>
  </Transition>
</template>
