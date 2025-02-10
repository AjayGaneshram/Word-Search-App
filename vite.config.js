import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // ✅ Auto-update service worker when new content is available
      workbox: {
        cleanupOutdatedCaches: true, // ✅ Remove old caches
        clientsClaim: true, // ✅ Take control of uncontrolled clients
        skipWaiting: true, // ✅ Activate SW immediately
      },
      strategies: "generateSW", // ✅ Automatically generates the service worker
      manifest: {
        short_name: "Word Search",
        name: "Word Search App",
        icons: [],
        start_url: "/Word-Search-App/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
      },
      devOptions: {
        enabled: true, // ✅ Ensures SW updates in development
      },
    }),
  ],
  base: "/Word-Search-App/",
  css: {
    postcss: { plugins: [tailwindcss()] },
  },
  build: {
    outDir: "dist",
    charset: "utf-8",
    sourcemap: false,
    minify: "terser", // ✅ Explicitly set minification to Terser
    terserOptions: {
      compress: {
        drop_console: true, // ✅ Remove console logs
        drop_debugger: true, // ✅ Remove debugger statements
      },
      format: {
        comments: false, // ✅ Remove comments
      }},
      assetsInlineLimit: 0,
      rollupOptions: {
        input: { main: "index.html" },
        output: {
          assetFileNames: "assets/[name].[hash].[ext]",
        },
      },
    },
  });
