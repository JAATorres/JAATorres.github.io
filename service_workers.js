const CACHE_NAME = 'v1_pwa_app_cache',
  urlsToCache = [
    './',
    'index.html',
    'css/estilo.css',
    'js/valueSW.js',
    'img/',
    'compra.html'
  ]


self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})


self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })

      .then(() => self.clients.claim())
  )
})


self.addEventListener('fetch', e => {

  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          return res
        }
        return fetch(e.request)
      }).catch(err => console.log('Falló algo al solicitar recursos', err))
  )
})
