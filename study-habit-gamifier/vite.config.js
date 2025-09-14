import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: './',
  define: {
    'process.env': process.env
  },
  server: {
    proxy: {
      '/canvas-api': {
        target: 'https://canvas.wisc.edu',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/canvas-api/, '/api/v1'),
        headers: {
          'Host': 'canvas.wisc.edu'
        }
      }
    }
  }
})
