
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
    workbox.clientsClaim();

    /**
     * The workboxSW.precacheAndRoute() method efficiently caches and responds to
     * requests for URLs in the manifest.
     * See https://goo.gl/S9QRab
     */
    self.__precacheManifest = [].concat(self.__precacheManifest || []);
    self.__precacheManifest.push({
      "url": "/manifest.json"
    });
    workbox.precaching.suppressWarnings();
    workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

    workbox.routing.registerNavigationRoute("/index.html", {

      blacklist: [/^\/_/,/\/[^\/]+\.[^\/]+$/],
    });

    /*workbox.routing.registerRoute(
      new RegExp('/avisos.*'),
      workbox.strategies.staleWhileRevalidate()
    );*/

    /*workbox.routing.registerRoute(
      ({url}) => url.pathname === "/manifest.json",
      workbox.strategies.staleWhileRevalidate()
    );*/
    //workbox.precaching.precacheAndRoute([]);
    /*
    const showNotification = () => {
    self.registration.showNotification('Background sync success!', {
      body: '🎉`🎉`🎉`'
    });
    };

    const bgSyncPlugin = new workbox.backgroundSync.Plugin(
    'dashboardr-queue',
    {
      callbacks: {
        queueDidReplay: showNotification
        // other types of callbacks could go here
      }
    }
    );
    const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin],
    });

    workbox.routing.registerRoute(
    ({url}) => url.pathname === "/api/add",
    networkWithBackgroundSync,
    'POST'
    );

    workbox.routing.registerRoute(
    ({url}) => url.pathname === "/api/delete",
    networkWithBackgroundSync,
    'POST'
    );
    */
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}