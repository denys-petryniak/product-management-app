<script setup lang="ts">
interface Props {
  isCustomError: boolean
  statusCode: number
  customCode: number
  message: string
}

const { isCustomError, statusCode, customCode, message } = defineProps<Props>()

const error = ref({
  code: 500,
  message: 'Ops, something went wrong!',
})

if (isCustomError) {
  error.value.message = message
  error.value.code = customCode
}

if (statusCode === 406) {
  error.value.code = 404
  error.value.message = "Sorry, we couldn't find this page"
}
</script>

<template>
  <div>
    <iconify-icon icon="lucide:triangle-alert" class="error__icon" />
    <h1 class="error__code">{{ error.code }}</h1>
    <p class="error__msg">{{ error.message }}</p>
    <div class="error-footer">
      <p class="error-footer__text">
        You'll find lots to explore on the home page.
      </p>
      <RouterLink to="/">
        <Button class="max-w-36">Back to homepage</Button>
      </RouterLink>
    </div>
  </div>
</template>
