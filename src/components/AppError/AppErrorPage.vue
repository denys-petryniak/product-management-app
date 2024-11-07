<script setup lang="ts">
const errorStore = useErrorStore()

const error = ref(errorStore.activeError)

const message = ref('')
const code = ref('')
const customCode = ref(0)
const statusCode = ref(0)
const details = ref('')
const hint = ref('')

if (error.value && !('code' in error.value)) {
  message.value = error.value.message
  customCode.value = error.value.customCode ?? 0
}

if (error.value && 'code' in error.value) {
  message.value = error.value.message
  code.value = error.value.code
  statusCode.value = error.value.statusCode ?? 0
  details.value = error.value.details
  hint.value = error.value.hint
}

const router = useRouter()

router.afterEach(() => {
  errorStore.activeError = null
})
</script>

<template>
  <section class="error">
    <AppErrorDevSection :message :code :customCode :statusCode :details :hint />
  </section>
</template>

<style scoped>
.error {
  @apply mx-auto -mt-20 flex min-h-[90vh] flex-1 items-center justify-center p-10 text-center;
}

:deep(.error__icon) {
  @apply text-7xl text-destructive;
}

:deep(.error__code) {
  @apply text-7xl font-extrabold text-secondary;
}

:deep(.error__msg) {
  @apply text-3xl font-extrabold text-primary;
}

:deep(.error-footer) {
  @apply mt-6 flex flex-col items-center justify-center gap-5 font-light;
}

:deep(.error-footer__text) {
  @apply text-lg text-muted-foreground;
}

:deep(p) {
  @apply my-2;
}
</style>
