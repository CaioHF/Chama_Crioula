// Service Worker Básico para PWA
const CACHE_NAME = 'chama-crioula-v1';
const urlsToCache = [
  './',
  './index.html',
  './estilos/style.css',
  './estilos/celular.css',
  './script.js',
  './produtos.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});