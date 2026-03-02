import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 3847,
    strictPort: true,
    // Fix Cross-Origin-Opener-Policy blocking Firebase Google popup
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
    },
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
