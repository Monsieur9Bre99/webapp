import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,       // active le polling
      interval: 100,          // intervalle en ms
    },
    host: true,                // pour exposer le serveur à 0.0.0.0
    strictPort: false,
  },
})