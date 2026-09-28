import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: [
        '**/*.7z',
        '**/*.zip',
        '**/*.rar',
        '**/*.tar*',
        '**/*.gz',
        '**/*.tmp',
        '**/~*',
        '**/.git/**',
        '**/node_modules/**'
      ]
    }
  }
});
