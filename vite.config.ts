import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/personal-website/',  // add this line
  plugins: [react()],
   build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // ensures new chunks each build
      }
    }
  }
})


