import { defineConfig } from 'vite'
import { resolve } from 'path'

import settings from './settings.json'

export default defineConfig(({ mode }) => ({
  base: './',
  build: {
    chunkSizeWarningLimit: 3000,
    cssCodeSplit: false,
    modulePreload: mode !== 'min',
    rollupOptions: {
      external: mode === 'min' ? ['react', 'react-dom', 'rxjs'] : [],
      input: {
        'test-components': resolve(__dirname, 'src/index.ts'),
      },
      output: {
        entryFileNames: (chunk) => `${chunk.name}.${mode === 'min' ? 'min.' : ''}esm.js`,
      },
    },
    outDir: 'dist',
    emptyOutDir: false,
    manifest: true,
    minify: 'esbuild',
  },
  esbuild: {
    charset: 'utf8',
    legalComments: 'none',
    target: settings.target,
  },
}))
