import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/ 
export default defineConfig({
  plugins: [react()],
  base:'/Word-Search-App/',
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    outDir: 'dist',
    charset: 'utf-8', // Ensure UTF-8 encoding
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: "index.html",
      },
      output: {
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
  publicDir: "public",
});