<script setup lang="ts"></script>

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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src="https://github.com/radix-vue.png"
            alt="@radix-vue"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </nav>
</template>
