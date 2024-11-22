<script setup lang="ts">
import { login } from '@/utils/supabaseAuth'

const formData = ref({
  email: '',
  password: '',
})

const { serverError, handleServerError } = useFormErrors()

const router = useRouter()

const signIn = async () => {
  const { error } = await login(formData.value)

  if (!error) {
    return router.push('/')
  }

  handleServerError(error)
}
</script>

<template>
  <div
    class="mx-auto -mt-20 flex min-h-[90vh] w-full items-center justify-center p-10 text-center"
  >
    <Card class="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-4 flex flex-col items-center justify-center gap-4">
          <Button variant="outline" class="w-full">
            Register with Google
          </Button>
          <Separator label="Or" />
        </div>
        <form class="grid gap-4" @submit.prevent="signIn">
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              type="email"
              placeholder="johndoe19@example.com"
              required
              :class="{ 'border-red-500': serverError }"
              v-model="formData.email"
            />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label id="password">Password</Label>
              <a href="#" class="ml-auto inline-block text-xs underline">
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              autocomplete
              required
              :class="{ 'border-red-500': serverError }"
              v-model="formData.password"
            />
          </div>
          <ul v-if="serverError" class="text-left text-sm text-red-500">
            <li class="list-disc">{{ serverError }}</li>
          </ul>
          <Button type="submit" class="w-full">Login</Button>
        </form>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <RouterLink to="/register" class="underline">Register</RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
