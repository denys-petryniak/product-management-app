import type { InjectionKey, Ref } from 'vue'

export interface MenuInjectionOptions {
  isMenuOpen: Ref<boolean>
  toggleMenu: () => void
}

export const menuKey = Symbol('menu') as InjectionKey<MenuInjectionOptions>
