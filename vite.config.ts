import { fileURLToPath } from "node:url";
import { defineConfig } from 'vite'
import unocssPlugin from "@unocss/vite";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), unocssPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
