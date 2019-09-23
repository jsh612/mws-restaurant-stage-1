var staticCacheName = 'restaurants'

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(
            [
              '/',
              '/index.html',
              '/restaurant.html',
              '/css/styles.css',
              '/js/main.js',
              '/js/dbhelper.js',
              '/data/restaurants.json',
              '/js/restaurant_info.js',
              '/img/'
            ]
        );
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true})
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
