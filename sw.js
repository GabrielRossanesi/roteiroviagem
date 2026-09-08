/**
 * sw.js - Service Worker 100% Offline (Road Copilot)
 * Estratégia Cache-First para todos os módulos e assets estáticos locais.
 */

const CACHE_NAME = 'viagem-fox-modular-v3';

const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './icon.svg',
  './js/data.js',
  './js/store.js',
  './js/icons.js',
  './js/app.js'
];

// Instalação do Service Worker e pré-cache de todos os módulos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pré-cache dos módulos locais concluído');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Ativação e limpeza de versões antigas do cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Removendo cache obsoleto:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia CACHE-FIRST com fallback resiliente para modo avião / sem sinal
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Retorna imediatamente do cache (instantâneo e sem tocar na rede)
        return cachedResponse;
      }

      // Se não estiver em cache, busca na rede e armazena para próximas visitas
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });

        return networkResponse;
      }).catch(() => {
        // Fallback para navegação
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html') || caches.match('./');
        }
      });
    })
  );
});
