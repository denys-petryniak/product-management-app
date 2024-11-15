<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'

const formData = ref({
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const router = useRouter()

const signUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
  })

  if (error) return console.error(error)

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.value.userName,
      full_name: `${formData.value.firstName} ${formData.value.lastName}`,
    })

    if (error) return console.error('Profiles error', error)
  }

  router.push('/')
}
</script>

<template>
  <div
    class="mx-auto -mt-10 flex h-full min-h-[90vh] w-full items-center justify-center p-10 text-center"
  >
    <Card class="mx-auto h-full w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="mb-4 flex flex-col items-center justify-center gap-4">
          <Button variant="outline" class="w-full">
            Register with Google
          </Button>
          <Separator label="Or" />
        </div>
        <form class="grid gap-4" @submit.prevent="signUp">
          <div class="grid gap-2">
            <Label id="username" class="text-left">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="johndoe19"
              required
              v-model="formData.userName"
            />
          </div>
          <div class="flex flex-col justify-between gap-4 sm:flex-row">
            <div class="grid gap-2">
              <Label id="first_name" class="text-left">First Name</Label>
              <Input
                id="first_name"
                type="text"
                placeholder="John"
                required
                v-model="formData.firstName"
              />
            </div>
            <div class="grid gap-2">
              <Label id="last_name" class="text-left">Last Name</Label>
              <Input
                id="last_name"
                type="text"
                placeholder="Doe"
                required
                v-model="formData.lastName"
              />
            </div>
          </div>
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe19@example.com"
              required
              v-model="formData.email"
            />
          </div>
          <div class="grid gap-2">
            <Label id="password" class="text-left">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="*****"
              autocomplete
              required
              v-model="formData.password"
            />
          </div>
          <div class="grid gap-2">
            <Label id="confirm_password" class="text-left"
              >Confirm Password</Label
            >
            <Input
              id="confirm_password"
              type="password"
              placeholder="*****"
              autocomplete
              required
              v-model="formData.confirmPassword"
            />
          </div>
          <Button type="submit" class="w-full">Register</Button>
          <!-- <Button variant="outline" class="w-full"> Login with Google </Button> -->
        </form>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <RouterLink to="/login" class="underline">Login</RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
