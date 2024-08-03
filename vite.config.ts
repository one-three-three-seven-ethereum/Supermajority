import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '::'
  },
  plugins: [
    vue()
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
