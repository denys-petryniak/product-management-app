import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // see https://vuejs.org/guide/extras/web-components.html
          isCustomElement: element => element.startsWith('iconify-icon'),
        },
      },
    }),
    VueRouter(),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      // global imports to register
      imports: [
        // presets
        'vue',
        // https://uvr.esm.is/introduction#auto-imports
        VueRouterAutoImports,
        // custom
        {
          pinia: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'],
        },
      ],
      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts: true,
      // Include auto-imported packages in Vite's `optimizeDeps` options
      // Recommend to enable
      viteOptimizeDeps: true,
      // Auto import for module exports under directories
      // by default it only scan one level of modules under the directory
      dirs: ['src/stores'],
    }),
    Components(),
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
