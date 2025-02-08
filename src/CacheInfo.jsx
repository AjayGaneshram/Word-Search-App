import { useEffect, useState } from "react";

export default function CacheInfo() {
  const [cacheDetails, setCacheDetails] = useState([]);
  const [totalSize, setTotalSize] = useState("Checking...");
  const [storageQuota, setStorageQuota] = useState("Checking...");
  const [serviceWorkers, setServiceWorkers] = useState([]);

  useEffect(() => {
    async function getCacheInfo() {
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

        for (const request of requests) {
          // Try fetching fresh response to update cache
          let response = await fetch(request.url, { cache: "reload" }).catch(
            () => null
          );

          if (!response || !response.ok) {
            // If network fetch fails, fallback to cache
            response = await cache.match(request, { ignoreSearch: true });
          } else {
            // If fetch succeeds, update cache
            await cache.put(request, response.clone());
          }

          if (response) {
            const blob = await response.blob();
            cacheSize += blob.size;

            // Extract headers
            const lastModified =
              response.headers.get("Last-Modified") || new Date();
            const cacheControl = response.headers.get("Cache-Control");
            let expiryTime = "Not available";

            // Extract max-age from Cache-Control
            if (cacheControl?.includes("max-age")) {
              const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
              if (maxAgeMatch) {
                const maxAgeSeconds = parseInt(maxAgeMatch[1], 10);
                expiryTime = new Date(Date.now() + maxAgeSeconds * 1000);
              }
            }

            // Store metadata
            localStorage.setItem(`${cacheName}-lastUpdated`, lastModified);
            localStorage.setItem(`${cacheName}-expiryTime`, expiryTime);
          }
        }

        totalBytes += cacheSize;

        cacheData.push({
          name: cacheName,
          size: (cacheSize / 1024 / 1024).toFixed(2) + " MB",
          lastUpdated:
            localStorage.getItem(`${cacheName}-lastUpdated`) || "Not available",
          expiryTime:
            localStorage.getItem(`${cacheName}-expiryTime`) || "Not available",
        });
      }

      setCacheDetails(cacheData);
      setTotalSize((totalBytes / 1024 / 1024).toFixed(2) + " MB");
    }

    async function getStorageEstimate() {
      if (navigator.storage?.estimate) {
        const estimate = await navigator.storage.estimate();
        setTotalSize((estimate.usage / 1024 / 1024).toFixed(2) + " MB");
        setStorageQuota((estimate.quota / 1024 / 1024).toFixed(2) + " MB");
      }
    }

    async function getServiceWorkerInfo() {
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        setServiceWorkers(
          registrations.map((registration) => ({
            scope: registration.scope,
            active: registration.active ? "✅ Active" : "❌ Not Active",
            installing: registration.installing ? "Installing..." : "No",
            waiting: registration.waiting ? "Waiting to activate" : "No",
          }))
        );
      }
    }

    getCacheInfo();
    getStorageEstimate();
    getServiceWorkerInfo();

    // Refresh cache details every 10 seconds
    const interval = setInterval(() => {
      getCacheInfo();
      getServiceWorkerInfo();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-2">Cache & Storage Info</h2>
      <p>
        <strong>📦 Total Cache Used:</strong> {totalSize}
      </p>
      <p>
        <strong>🗄 Storage Quota:</strong> {storageQuota}
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

      <h3 className="text-md font-semibold mt-4">Service Workers:</h3>
      <ul className="list-disc pl-5">
        {serviceWorkers.length > 0 ? (
          serviceWorkers.map((sw, index) => (
            <li key={index} className="mb-2">
              <strong>Scope:</strong> {sw.scope} <br />⚡{" "}
              <strong>Status:</strong> {sw.active} <br />
              🏗 <strong>Installing:</strong> {sw.installing} <br />⏳{" "}
              <strong>Waiting:</strong> {sw.waiting}
            </li>
          ))
        ) : (
          <p>No Service Workers Registered</p>
        )}
      </ul>
    </div>
  );
}
