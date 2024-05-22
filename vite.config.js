import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base : '',  // '' 로 하지 않으면 build 하고 빈페이지 나옴
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
})
