import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// Relative asset URLs make the same build work under /werwolf/ and at a domain root.
export default defineConfig({
  plugins: [react()],
  base: './',
});
