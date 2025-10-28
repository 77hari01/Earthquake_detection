import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // ensures correct paths when hosted on Render or GitHub Pages
  build: {
    outDir: 'dist', // default build output directory
  },
})
