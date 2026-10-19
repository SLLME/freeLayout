import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// Library build: `npm run build`
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.json',
      rollupTypes: false,
    }),
  ],
  resolve: {
    alias: {
      '@cjnkm/vue-free-layout': fileURLToPath(new URL('./src/index.ts', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'FreeLayout',
      fileName: (format) => (format === 'es' ? 'vue-free-layout.js' : 'vue-free-layout.umd.cjs'),
      formats: ['es', 'umd'],
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        exports: 'named',
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
})
