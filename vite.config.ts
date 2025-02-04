import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '::'
  },
  plugins: [
    vue(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames(assetInfo) {
          if (assetInfo.name?.endsWith('css')) {
            return 'assets/[name]-[hash].[ext]'
          }

          return 'assets/[name].[ext]'
        }
      }
    }
  }
})
