import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('nile-') // ✅ Ignore web components starting with 'nile-'
    }
  }
})
