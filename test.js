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

async function generateName() {
    const name = await getRandomName();
    return `Тебе стоит посмотреть на ${name}!!!`
}

generateName();
