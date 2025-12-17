import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: 'src/main.jsx',
      name: 'SocialProofWidget',
      fileName: (format) => `widget.${format}.js`
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  define: {
    'process.env': {}
  }
});