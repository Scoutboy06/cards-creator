import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  root: 'src',
  plugins: [viteSingleFile()],
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Remove manualChunks as it conflicts with inlineDynamicImports
        inlineDynamicImports: true,
      },
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
})
