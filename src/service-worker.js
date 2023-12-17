const VERSION = "v4";

log = (msg) => console.log(`${VERSION}:${msg}`);

self.addEventListener('push', function(event) {
    let bodyText = "Время посмотреть какого-нибудь нового персонажа"
    // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
    const options = {
        body: bodyText,
        icon: "https://pbs.twimg.com/media/Fd4LvbbagAA1wca.jpg:large",
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: "vibration-sample",
    }

    let promise = self.registration.showNotification('Время узнать новых героев!', options);

    event.waitUntil(promise);
});


