import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter(),
    vue({
      template: {
        compilerOptions: {
          // see https://vuejs.org/guide/extras/web-components.html
          isCustomElement: element => element.startsWith('iconify-icon'),
        },
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
