import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/shizuoka-yasune-navi/',
  build: {
    outDir: 'dist',
  }
})
