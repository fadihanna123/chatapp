import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
  base: '/',
  plugins: [react(), commonjs(), tsconfigPaths()],
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
});
