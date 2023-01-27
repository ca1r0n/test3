import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from "path"
import viteSvgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      viteSvgr({
        exportAsDefault: true
      }),
      react()
  ],
  esbuild: {
    jsxInject: "import React from \"react\""
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/_main.scss" as *;`
      }
    }
  },
  appType: "spa",
})
