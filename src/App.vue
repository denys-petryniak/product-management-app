<script setup lang="ts"></script>

<template>
  <AuthLayout>
    <RouterView v-slot="{ Component, route }">
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
