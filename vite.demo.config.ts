import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Demo build: `npm run build:demo` -> ./demo-dist (relative asset paths, opens from disk)
export default defineConfig({
  base: './',
  root: fileURLToPath(new URL('./playground', import.meta.url)),
  plugins: [vue()],
  resolve: {
    alias: {
      '@cjnkm/vue-free-layout': fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      '@': fileURLToPath(new URL('./playground', import.meta.url)),
    },
  },
  build: {
    outDir: fileURLToPath(new URL('./demo-dist', import.meta.url)),
    emptyOutDir: true,
  },
})
