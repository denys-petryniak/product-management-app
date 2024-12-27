<script setup lang="ts">
const isSheetOpen = defineModel<boolean>()
</script>

<template>
  <Sheet v-model:open="isSheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new Task</SheetTitle>
      </SheetHeader>
      <p>Content</p>
    </SheetContent>
  </Sheet>
</template>
