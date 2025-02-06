import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Auto-update the service worker when new content is available
      manifest: {
        name: "Word Search App",
        short_name: "WordSearch",
        start_url: "/Word-Search-App/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^\/Word-Search-App\/Output\.jsx$/,
            handler: "StaleWhileRevalidate", // Use cached version but update in the background
            options: {
              cacheName: "output-jsx-cache",
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 24 * 60 * 60, // Cache for 1 day
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "script" || request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 1 week
              },
            },
          },
        ],
      },
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
