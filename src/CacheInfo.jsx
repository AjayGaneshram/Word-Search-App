import { useEffect, useState } from "react";

export default function CacheInfo() {
  const [cacheDetails, setCacheDetails] = useState([]);
  const [totalSize, setTotalSize] = useState("Calculating...");

  useEffect(() => {
    async function getCacheStorageUsage() {
      if (!("caches" in window)) {
        setTotalSize("Cache API not supported");
        return;
      }

      const cacheNames = await caches.keys();
      let totalBytes = 0;
      let cacheData = [];

      for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        let cacheSize = 0;
        let lastUpdated =
          localStorage.getItem(`${cacheName}-lastUpdated`) || "Not available";
        let expiryTime =
          localStorage.getItem(`${cacheName}-expiryTime`) || "Not available";

        for (const request of requests) {
          const response = await cache.match(request);
          if (response) {
            const blob = await response.blob();
            cacheSize += blob.size;
          }
        }

        // Convert bytes to MB
        totalBytes += cacheSize;
        cacheData.push({
          name: cacheName,
          size: (cacheSize / 1024 / 1024).toFixed(2) + " MB",
          lastUpdated,
          expiryTime,
        });
      }

      setCacheDetails(cacheData);
      setTotalSize((totalBytes / 1024 / 1024).toFixed(2) + " MB");
    }

    // Listen for cache updates via service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.active) {
          const channel = new BroadcastChannel("cache-updates");
          channel.addEventListener("message", (event) => {
            if (event.data.meta === "workbox-broadcast-update") {
              const timestamp = new Date().toLocaleString();
              const cacheName = event.data.payload.cacheName;

              // Set last updated time
              localStorage.setItem(`${cacheName}-lastUpdated`, timestamp);

              // Set expiry based on cache rules
              let expiryDate = new Date();
              if (cacheName.includes("html")) {
                expiryDate.setDate(expiryDate.getDate() + 1);
              } else if (cacheName.includes("assets")) {
                expiryDate.setDate(expiryDate.getDate() + 7);
              } else if (cacheName.includes("image")) {
                expiryDate.setDate(expiryDate.getDate() + 30);
              }

              localStorage.setItem(
                `${cacheName}-expiryTime`,
                expiryDate.toLocaleString()
              );
              getCacheStorageUsage(); // Refresh UI
            }
          });
        }
      });
    }

    getCacheStorageUsage();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white max-w-sm mx-auto">
      <h2 className="text-lg font-bold mb-2">Cache Storage Info</h2>
      <p>
        <strong>📦 Total Cache Used:</strong> {totalSize}
      </p>

      <h3 className="text-md font-semibold mt-4">Cache Breakdown:</h3>
      <ul className="list-disc pl-5">
        {cacheDetails.map((cache) => (
          <li key={cache.name} className="mb-2">
            <strong>{cache.name}:</strong> {cache.size} <br />⏳{" "}
            <strong>Last Updated:</strong> {cache.lastUpdated} <br />
            🗓 <strong>Expires On:</strong> {cache.expiryTime}
          </li>
        ))}
      </ul>
    </div>
  );
}
