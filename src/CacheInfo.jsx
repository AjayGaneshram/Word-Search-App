import { useEffect, useState } from "react";

export default function CacheInfo() {
  const [storageSize, setStorageSize] = useState("Loading...");
  const [lastUpdated, setLastUpdated] = useState("Not available");
  const [expiryTime, setExpiryTime] = useState("Not available");

  // Get cache storage size
  async function getCacheStorageSize() {
    if ("storage" in navigator && "estimate" in navigator.storage) {
      const { usage, quota } = await navigator.storage.estimate();
      return (usage / 1024 / 1024).toFixed(2) + " MB"; // Convert to MB
    }
    return "Storage info not available";
  }

  // Get cache expiry time (assuming 7 days expiry)
  function getCacheExpiryTime() {
    const lastUpdated = localStorage.getItem("cacheLastUpdated");
    if (!lastUpdated) return "Not available";

    const expiryDate = new Date(lastUpdated);
    expiryDate.setDate(expiryDate.getDate() + 7); // Add 7 days

    return expiryDate.toLocaleString(); // Format as readable date
  }

  useEffect(() => {
    getCacheStorageSize().then(setStorageSize);
    setLastUpdated(localStorage.getItem("cacheLastUpdated") || "Not available");
    setExpiryTime(getCacheExpiryTime());
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white max-w-sm mx-auto">
      <h2 className="text-lg font-bold mb-2">Cache Storage Info</h2>
      <p><strong>📦 Used Storage:</strong> {storageSize}</p>
      <p><strong>⏳ Last Updated:</strong> {lastUpdated}</p>
      <p><strong>🗓 Expires On:</strong> {expiryTime}</p>
    </div>
  );
}
