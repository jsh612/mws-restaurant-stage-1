self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('restaurants')
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(
            [
              '/',
              '/index.html',
              '/restaurant.html',
              '/css/styles.css',
              '/js/dbhelper.js',
              '/data/restaurants.json',
              '/js/restaurant_info.js',
              '/img/'
            ]
        );
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
