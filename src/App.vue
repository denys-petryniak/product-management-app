<script setup lang="ts">
import Sidebar from '@/components/layout/Sidebar.vue'
import TopNavbar from '@/components/layout/TopNavbar.vue'
</script>

<template>
  <Sidebar />
  <div class="ml-16 flex flex-col transition-[margin] lg:ml-52">
    <TopNavbar />
    <main>
      <RouterView />
    </main>
  </div>
</template>
