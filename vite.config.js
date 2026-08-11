import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
// Forcing server restart to apply Tailwind and Dependency changes
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
})
