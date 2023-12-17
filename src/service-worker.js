const VERSION = "v4";

log = (msg) => console.log(`${VERSION}:${msg}`);

self.addEventListener('push', function(event) {
    bodyText =generateName()
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


async function generateName() {
    const name = await getRandomName();
    return `Тебе стоит посмотреть на ${name}!!!`
}

async function getRandomName() {
    const apiUrl = 'https://narutodb.xyz/api/character?page=1&limit=1431';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data || !data.characters || !Array.isArray(data.characters)) {
            console.error('Недопустимый формат данных:', data);
            return;
        }

        const characters = data.characters;
        const randomCharacter = getRandomElement(characters);
        console.log("Имя в функции getRandomName ", randomCharacter.name);
        return randomCharacter.name;
    } catch (error) {
        console.error('Ошибка при получении персонажей:', error);
    }
}

function getRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    console.log(randomIndex);
    return arr[randomIndex];
}