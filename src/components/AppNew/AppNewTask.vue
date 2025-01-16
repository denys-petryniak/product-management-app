<script setup lang="ts">
import { FormKit } from '@formkit/vue'

const isSheetOpen = defineModel<boolean>()
</script>

<template>
  <Sheet v-model:open="isSheetOpen">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new Task</SheetTitle>
      </SheetHeader>
      <FormKit type="text" />
    </SheetContent>
  </Sheet>
</template>
