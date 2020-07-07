
//importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js");
importScripts('./my-env-vars.js')
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
      "url": "/"+REACT_APP_COMPANY_CODE+"/manifest.json",
      "revision": null
    });
    self.__precacheManifest.push({  
      "url": "/"+REACT_APP_COMPANY_CODE+"/favicon.ico",
      "revision": null
    });
    self.__precacheManifest.push({  
      "url": "/"+REACT_APP_COMPANY_CODE+"/favicon-32x32.png",
      "revision": null
    });
    self.__precacheManifest.push({  
      "url": "/"+REACT_APP_COMPANY_CODE+"/favicon-16x16.png",
      "revision": null
    });

    precaching.precacheAndRoute(self.__precacheManifest, {});

    // This assumes /index.html has been precached.
    const handler = precaching.createHandlerBoundToURL('/index.html');
    const navigationRoute = new routing.NavigationRoute(handler);
    routing.registerRoute(navigationRoute);
    
    routing.registerRoute(
      ({url}) => url.pathname.includes("/company/") && url.pathname.includes("/route"),
      new strategies.NetworkFirst({
        plugins: [
          new expiration.CacheExpiration({
          // Only cache requests for a six hours
          maxAgeSeconds: 6 * 60 * 60,
        })
        ]
      })
    );
    
    const showNotification = () => {
      self.registration.showNotification('Background sync success!', {
        body: '🎉`🎉`🎉`'
      });
    };

    const queue = new backgroundSync.Queue('ambar-queue-post-manual',{
      callbacks: {
        queueDidReplay: showNotification
      }
    });
    routing.registerRoute(
    ({url}) => url.pathname.includes("/route"),
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

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}