/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enables describe/test/expect globally
    environment: 'jsdom', // Provides DOM environment
    setupFiles: './src/setupTests.ts' // For Jest DOM extensions
  }
})
