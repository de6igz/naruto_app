const VERSION = "v4";

log = (msg) => console.log(`${VERSION}:${msg}`);

self.addEventListener('push', function(event) {
    // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
    const options = {
        body: "Buzz! Buzz!",
        icon: "https://i.pinimg.com/originals/5c/8f/e4/5c8fe49d0218d0f35706df1459ddf25e.jpg",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: "vibration-sample",
    }

    let promise = self.registration.showNotification('Push notification!', options);

    event.waitUntil(promise);
});