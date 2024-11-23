<template>
  <ul v-if="errorMessages.length" class="text-left text-sm text-red-500">
    <li v-for="(error, index) in errorMessages" :key="index" class="list-disc">
      {{ error }}
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Props {
  errors: string | string[]
}

const { errors } = defineProps<Props>()

const errorMessages = computed(() =>
  Array.isArray(errors) ? errors : [errors],
)
</script>
