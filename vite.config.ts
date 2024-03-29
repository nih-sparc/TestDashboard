import { fileURLToPath, URL } from 'node:url'
import { resolve} from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.js'),
      name: 'YourLibraryName',
      fileName: (format) => `sparc-dashboard-beta.${format}.js`,
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
