const cacheName = 'punchcard-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/textToPunchcard.html',
  '/punchcardToText.html',
  '/punchcardStyle.css',
  '/style.css',
  '/script.js',
  '/punchCardCoder.js',
  '/punchCardDecoder.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});