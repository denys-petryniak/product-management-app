<script setup lang="ts"></script>

<template>
  <AuthLayout>
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <Suspense :timeout="0">
          <Component :is="Component" :key="route.name"></Component>
          <template #fallback>
            <span>Loading...</span>
          </template>
        </Suspense>
      </template>
    </RouterView>
  </AuthLayout>
</template>
