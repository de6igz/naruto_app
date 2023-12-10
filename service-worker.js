// service-worker.js

const CACHE_NAME = 'my-pwa-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    // Добавьте сюда пути к другим ресурсам, которые вы хотите кэшировать
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
