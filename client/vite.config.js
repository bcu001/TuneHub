import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
  },
  server: {
    // Not needed for Vercel, only local dev, but OK to keep
    watch: {
      usePolling: true,
    },
  },
  // ✨ Most important part
  preview: {
    // This handles history fallback for Vercel preview/static hosting
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
    }
  }
})
