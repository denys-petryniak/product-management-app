// Global state to track the menu's open/closed status
const isMenuOpen = ref(false)

export const useMenu = () => {
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  return {
    isMenuOpen,
    toggleMenu,
  }
}
