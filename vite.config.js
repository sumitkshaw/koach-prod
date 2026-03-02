import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 3847,
    strictPort: true,
    proxy: {
      // All /api/* requests are forwarded to the Express backend
      '/api': {
        target: 'http://localhost:4731',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
