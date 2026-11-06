import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'three-bundle';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'motion-bundle';
          }
          if (id.includes('node_modules/gsap') || id.includes('node_modules/lenis')) {
            return 'gsap-bundle';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'lucide-bundle';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 3000,
    open: false,
  },
});
