
const staticCacheName = 'static-cache-v0';
const dynamicCacheName = 'dynamic-cache-v0';

const staticAssets = [
    './',
    'index.html',
    'images/icons/icon-128x128.png',
    'images/icons/icon-192x192.png',
    'offline.html',
    'css/main.css',
    'js/app.js',
    'js/main.js',
    'images/no-image.jpg'
];

//install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then( cache => {
      console.log('caching cell assets');
        cache.addAll(assets)
    })
  )

})

//activate event
self.addEventListener('activate', evt => {
  console.log('service worker activated');
})

//fetch event
self.addEventListener('fetch', evt => {
  console.log('fetch Event', evt);
})

async function checkCache(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || checkOnline(req);
}

async function checkOnline(req) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const res = await fetch(req);
        await cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedRes = await cache.match(req);
        if (cachedRes) {
            return cachedRes;
        } else if (req.url.indexOf('.html') !== -1) {
            return caches.match('./offline.html');
        } else {
            return caches.match('./images/no-image.jpg');
        }
    }
}
