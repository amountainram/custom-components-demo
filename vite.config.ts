import { defineConfig } from 'vite'
import { resolve } from 'path'
import settings from './settings.json'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => ({
  base: './',
  build: {
    chunkSizeWarningLimit: 3000,
    cssCodeSplit: false,
    emptyOutDir: false,
    manifest: true,
    minify: 'esbuild',
    modulePreload: mode !== 'min',
    outDir: 'dist',
    rollupOptions: {
      external: mode === 'min' ? ['react', 'react-dom', 'rxjs'] : [],
      input: {
        'test-components': resolve(__dirname, 'src/index.ts'),
      },
      output: {
        entryFileNames: (chunk) => `${chunk.name}.${mode === 'min' ? 'min.' : ''}esm.js`,
      },
    },
  },
  esbuild: {
    charset: 'utf8',
    legalComments: 'none',
    target: settings.target,
  },
  plugins: [svgr()],
}))
