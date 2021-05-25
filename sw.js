const CACHE_NAME = "web"; // TODO: switch to version based
const OFFLINE_URL = "index.html";
var urlsToCache = new Set();

//  Get generated files list from asset-manifest.json [Again generated by React only].
async function getFilesList() {
  let root = location.pathname.split("/sw.js")[0]; // Because of the Stupid CRA -_-
  return fetch(root + "/asset-manifest.json").then((res) => res.json());
}

// Install event for new service worker.
self.addEventListener("install", (event) => {
  self.skipWaiting(); // Force new service worker on new code.

  // Cache everything new and updated
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      let root = location.pathname.split("/sw.js")[0]; // Because of the Stupid CRA -_-
      urlsToCache.add(root + "/index.html");
      urlsToCache.add(root + "/index.css");
      urlsToCache.add(root + "/icons/logo.png");
      urlsToCache.add(root + "/.webmanifest");
      const list = await getFilesList();
      if (list)
        Object.values(list.files).forEach((val) => urlsToCache.add(val));
      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          console.log("Fetch failed; returning offline page instead.", error);

          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  }
});

// // Activate the SW
self.addEventListener("activate", (event) => {
  console.log("Activated: ", event);
  // Delete old and redundant stuff
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.keys().then((keys) => {
        keys.map((key) => {
          if (!urlsToCache.has(key.url.split(self.location.origin)[1]))
            cache.delete(key);
        });
      });
    })
  );
});
