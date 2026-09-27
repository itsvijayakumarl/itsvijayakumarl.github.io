import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  // Inline PostCSS config: stops Vite picking up a postcss/tailwind config from a parent folder.
  css: { postcss: { plugins: [] } },
  resolve: { alias: { '@': import.meta.dirname } },
  build: {
    chunkSizeWarningLimit: 800,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'three', test: /node_modules[\\/]three/ },
            { name: 'anim', test: /node_modules[\\/](gsap|lenis|motion|framer-motion)/ },
          ],
        },
      },
    },
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});
