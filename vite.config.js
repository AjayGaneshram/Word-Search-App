import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
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
                maxEntries: 5,
                maxAgeSeconds: 24 * 60 * 60,
                purgeOnQuotaError: true,
              },
              broadcastUpdate: {
                channelName: "html-cache-updates",
                options: {
                  headersToCheck: ["ETag"], // Required property
                },
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "script" || request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "assets-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 7 * 24 * 60 * 60,
                purgeOnQuotaError: true,
              },
              broadcastUpdate: {
                channelName: "assets-cache-updates",
                options: {
                  headersToCheck: ["ETag"], // Required property
                },
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
              broadcastUpdate: {
                channelName: "image-cache-updates",
                options: {
                  headersToCheck: ["ETag"], // Required property
                },
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
    charset: "utf-8",
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
