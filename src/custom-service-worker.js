
//importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js");

if (workbox) {
  const {strategies, expiration, backgroundSync, routing, precaching} = workbox;
    console.log(`Yay! Workbox is loaded 🎉`);
    //workbox.clientsClaim();

    /**
     * The workboxSW.precacheAndRoute() method efficiently caches and responds to
     * requests for URLs in the manifest.
     * See https://goo.gl/S9QRab
     */
    self.__precacheManifest = [].concat(self.__precacheManifest || []);
    self.__precacheManifest.push({
      "url": "/manifest.json"
    });
    //workbox.precaching.suppressWarnings();
    precaching.precacheAndRoute(self.__precacheManifest, {});

    routing.registerRoute(new routing.NavigationRoute("/index.html", {
      denylist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
      })
    );
    routing.registerRoute(
      ({url}) => url.pathname.includes("/company/amb/vehicle/") && url.pathname.includes("/route"),
      new strategies.NetworkFirst({
        plugins: [
          new expiration.CacheExpiration({
          // Only cache requests for a six hours
          maxAgeSeconds: 6 * 60 * 60,
        })
        ]
      })
    );

    /*workbox.routing.registerRoute(
      ({url}) => url.pathname === "/manifest.json",
      workbox.strategies.staleWhileRevalidate()
    );*/
    //workbox.precaching.precacheAndRoute([]);
    
    const showNotification = () => {
      self.registration.showNotification('Background sync success!', {
        body: '🎉`🎉`🎉`'
      });
    };
       /*const bgSyncPlugin = new workbox.backgroundSync.Plugin(
    'ambar-avisos-queue',
    {
      /*callbacks: {
        queueDidReplay: showNotification
        // other types of callbacks could go here
      }
    });*/

    //const queue = new workbox.backgroundSync.Queue('ambar-queue-post-manual');

    /*self.addEventListener('fetch', (event) => {
      // Clone the request to ensure it's safe to read when
      // adding to the Queue.
      const promiseChain = fetch(event.request.clone()).catch((err) => {
        return queue.pushRequest({request: event.request});
      });

      event.waitUntil(promiseChain);
    });*/
    /*self.addEventListener('fetch', function(event) {
      // every request from our site, passes through the fetch handler
      // I have proof
      console.log('I am a request with url: ',
      event.request.clone().url)
      if (event.request.clone().method === 'GET') {
        event.respondWith(
          // check all the caches in the browser and find
          // out whether our request is in any of them
          caches.match(event.request.clone())
            .then(function(response) {
              if (response) {
                // if we are here, that means there's a match
                //return the response stored in browser
                return response;
              }
              // no match in cache, use the network instead
              return fetch(event.request.clone());
            }
          )
        );
      } else if (event.request.clone().method === 'POST') {
        // attempt to send request normally
        event.respondWith(fetch(event.request.clone()).catch(function
        (error) {
          // only save post requests in browser, if an error occurs
          //savePostRequests(event.request.clone().url, form_data)
          return queue.pushRequest({request: event.request.clone()});
        }))
      }
    });*/
    
    /*const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
    });
    
    const bgSyncPlugin = new backgroundSync.BackgroundSyncPlugin('ambar-queue-post-manual', {
      maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
    });*/
    const queue = new backgroundSync.Queue('ambar-queue-post-manual',{
      callbacks: {
        queueDidReplay: showNotification
      }
    });
    routing.registerRoute(
      //({url}) => console.log(url),///\/company\/amb\/route/,
    ({url}) => url.pathname === "/company/amb/route",
    async ({url, request, event, params}) => {
      // Clone the request to ensure it's safe to read when
      // adding to the Queue.
      const promiseChain = await fetch(event.request.clone()).catch((err) => {
        if(err.message === "Failed to fetch"){
          return queue.pushRequest({request: event.request});
        }
      });
      return new Response("offline");
      //event.waitUntil(promiseChain);
    },
    'POST'
    );
    /*
    workbox.routing.registerRoute(
    ({url}) => url.pathname === "/api/delete",
    networkWithBackgroundSync,
    'POST'
    );
    */
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}