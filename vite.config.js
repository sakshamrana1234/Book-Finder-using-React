import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // this line for GitHub Pages deployment
  base: '/Book-Finder-using-React/'
})
