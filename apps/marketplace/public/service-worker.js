// Minimal service worker — exists only to satisfy browsers' installability
// requirement (Chrome still requires one registered, even without a fetch
// handler). No caching, no offline support: intentionally out of scope for
// this pass. See public/index.html for the registration call.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
