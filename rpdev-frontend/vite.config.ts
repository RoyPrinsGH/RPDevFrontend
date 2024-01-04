import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'app/app-[name]-[hash].js',
        chunkFileNames: 'app/module-[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash].[extname]`;
        },
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'], // react
          three: ['three'], // three
        }
      }
    }
  },
})
