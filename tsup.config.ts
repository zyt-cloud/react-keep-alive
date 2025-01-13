import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  outDir: 'dist',
  clean: true,
  dts: true,
  target: 'es2015',
  platform: 'browser',
  external: ['react', 'react-dom'],
  minify: false,
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    }
  },
})
