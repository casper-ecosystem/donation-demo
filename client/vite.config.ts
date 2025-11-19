import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // Use relative paths for assets to work in any deployment context
  base: './',
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      // Set up path alias for src directory to match baseUrl in tsconfig
      '@': path.resolve(__dirname, './src'),
      // Support imports from src without @ prefix
      components: path.resolve(__dirname, './src/components'),
      utils: path.resolve(__dirname, './src/utils'),
      hooks: path.resolve(__dirname, './src/hooks'),
      api: path.resolve(__dirname, './src/api'),
      assets: path.resolve(__dirname, './src/assets')
    }
  },
  build: {
    outDir: 'build',
    sourcemap: true
  },
  server: {
    port: 3000,
    open: true
  },
  // Handle the config.js global variable
  define: {
    // This allows the global config to be available
  }
});
