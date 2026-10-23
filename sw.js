// Ancien service worker remplacé : il supprime les caches et se désinscrit,
// afin que la nouvelle version de l'application s'affiche toujours.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil((async function () {
    var keys = await caches.keys();
    await Promise.all(keys.map(function (k) { return caches.delete(k); }));
    await self.registration.unregister();
    var cs = await self.clients.matchAll({ type: 'window' });
    cs.forEach(function (c) { c.navigate(c.url); });
  })());
});
