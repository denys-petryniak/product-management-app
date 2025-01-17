<script setup lang="ts">
const status = defineModel<'in-progress' | 'completed'>()

interface Props {
  readonly?: boolean
}

const { readonly = false } = defineProps<Props>()

const emit = defineEmits(['commit'])

const toggleStatus = () => {
  if (readonly) return

  status.value = status.value === 'in-progress' ? 'completed' : 'in-progress'

  emit('commit')
}
</script>

<template>
  <div
    :class="['cursor-pointer', 'text-2xl', { 'pointer-events-none': readonly }]"
    @click="toggleStatus"
  >
    <Transition name="scale" mode="out-in">
      <iconify-icon
        v-if="status === 'completed'"
        icon="lucide:circle-check"
        class="text-green-500"
      />
      <iconify-icon v-else icon="lucide:circle-dot" class="text-gray-500" />
    </Transition>
  </div>
</template>
