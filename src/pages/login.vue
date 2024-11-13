<script setup lang="ts"></script>

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
        <form class="grid gap-4">
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input type="email" placeholder="johndoe19@example.com" required />
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label id="password">Password</Label>
              <a href="#" class="ml-auto inline-block text-xs underline">
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" autocomplete required />
          </div>
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
