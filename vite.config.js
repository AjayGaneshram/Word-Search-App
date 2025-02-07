import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Ensures SW updates on new deployment
      manifest: {
        name: "Word Search App",
        short_name: "WordSearch",
        start_url: "/Word-Search-App/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
      },
      workbox: {
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "html-cache",
              expiration: {
                maxEntries: 5, // Keep only 5 HTML files
                maxAgeSeconds: 24 * 60 * 60, // Expire after 1 day
                purgeOnQuotaError: true
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "script" || request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 20, // Store up to 20 script/style files
                maxAgeSeconds: 7 * 24 * 60 * 60, // Expire after 7 days
                purgeOnQuotaError: true
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 50, // Store up to 50 images
                maxAgeSeconds: 30 * 24 * 60 * 60, // Expire after 30 days
              },
            },
          },
        ],
      }
      
    }),
  ],
  base: "/Word-Search-App/",
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    outDir: "dist",
    charset: "utf-8", // Ensure UTF-8 encoding
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
});
