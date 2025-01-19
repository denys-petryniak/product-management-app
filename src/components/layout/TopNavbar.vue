<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const { profile } = storeToRefs(useAuthStore())

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <nav
    class="flex h-16 items-center justify-between gap-2 border-b bg-muted/40 px-6"
  >
    <form class="relative h-fit w-full max-w-96">
      <iconify-icon
        class="absolute left-2.5 top-[50%] translate-y-[-50%] text-muted-foreground"
        icon="lucide:search"
      ></iconify-icon>
      <Input
        class="w-full bg-background pl-8"
        type="text"
        placeholder="Search ..."
      />
    </form>
    <div class="flex items-center justify-center gap-4">
      <Button class="h-8 w-8" @click="toggleDark()">
        <Transition name="scale" mode="out-in">
          <iconify-icon v-if="isDark" icon="lucide:sun" />
          <iconify-icon v-else icon="lucide:moon" />
        </Transition>
      </Button>
      <div class="h-10 w-10">
        <DropdownMenu v-if="profile">
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                :src="profile.avatar_url ?? ''"
                :alt="`${profile.full_name} profile picture`"
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <RouterLink
                :to="{
                  name: '/users/[username]',
                  params: { username: profile.username },
                }"
                class="h-full w-full"
              >
                <span>Profile</span>
              </RouterLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </nav>
</template>
