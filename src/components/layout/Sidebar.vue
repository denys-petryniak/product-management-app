<script setup lang="ts">
const { profile } = storeToRefs(useAuthStore())

const links = [
  {
    title: 'Dashboard',
    to: '/',
    icon: 'lucide:house',
  },
  {
    title: 'Projects',
    to: '/projects',
    icon: 'lucide:package',
  },
  {
    title: 'Tasks',
    to: '/tasks',
    icon: 'lucide:badge-check',
  },
]

const accountLinks = computed(() => [
  {
    title: 'Profile',
    to: `/users/${profile.value?.username}`,
    icon: 'lucide:user',
  },
  {
    title: 'Sign Out',
    icon: 'lucide:log-out',
  },
])

const router = useRouter()

const executeAction = async (linkTitle: string) => {
  if (linkTitle === 'Sign Out') {
    const { logout } = await import('@/utils/supabaseAuth')

    const isLoggedOut = await logout()

    if (isLoggedOut) {
      router.push('/login')
    }
  }
}

defineEmits(['taskSelected'])
</script>

<template>
  <aside
    class="fixed flex h-screen w-16 flex-col gap-2 border-r bg-muted/40 transition-[width] lg:w-52"
  >
    <div
      class="flex h-16 shrink-0 items-center justify-between gap-1 border-b px-2 lg:px-4"
    >
      <Button variant="outline" size="icon" class="h-8 w-8">
        <iconify-icon icon="lucide:menu"></iconify-icon>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" class="h-8 w-8">
            <iconify-icon icon="lucide:plus"></iconify-icon>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="$emit('taskSelected')"
            >Task</DropdownMenuItem
          >
          <DropdownMenuItem>Project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <nav class="relative flex h-full flex-col justify-between gap-2">
      <div>
        <SidebarLinks :links="links" />
      </div>
      <div class="border-y bg-background py-3 text-center">
        <SidebarLinks :links="accountLinks" @actionClicked="executeAction" />
      </div>
    </nav>
  </aside>
</template>
