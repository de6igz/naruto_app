// characters.js
const charactersAPI = 'https://narutodb.xyz/api/character?page=1&limit=1431'; // Замените на реальный URL вашего API
const audioElement = new Audio('../../resources/audio/theme-switch.mp3');

document.addEventListener('DOMContentLoaded', function () {
    // Применение сохраненной темы при загрузке страницы
    const isDarkTheme = localStorage.getItem('isDarkTheme') === 'true';
    const body = document.body;
    if (isDarkTheme) {
        body.classList.add('dark-theme');
    }

    // Получение данных о персонажах из API и отображение на странице
    fetch(charactersAPI)
        .then(response => response.json())
        .then(data => {
            if (!data || !data.characters || !Array.isArray(data.characters)) {
                console.error('Invalid data format:', data);
                return;
            }

            const characters = data.characters;
            const characterContainer = document.getElementById('characterContainer');
            characters.forEach(character => {
                try {
                    const characterBlock = createCharacterBlock(character);
                    characterContainer.appendChild(characterBlock);
                } catch (error) {
                    console.error('Error creating character block:', error);
                }
            });
            caches.open('my-cache').then(function (cache) {
                let arr  = [];

                let map = new Map();
                characters.forEach(character=>{
                    arr.push(character.name)
                    map.set(character.name,character.id)
                })
                // Сериализация данных перед сохранением в кэш
                var serializedData = JSON.stringify(arr);

                // Добавляем сериализированные данные в кэш
                cache.put('my-data-key', new Response(serializedData));

            })
        })
        .catch(error => console.error('Error fetching characters:', error));

});

function createCharacterBlock(character) {
    const characterBlock = document.createElement('div');
    characterBlock.className = 'character-block';

    const characterLink = document.createElement('a');
    characterLink.text = 'Подробнее'
    characterLink.href = '/character?id=' + character.id;
    console.log(characterLink)

    const characterImage = document.createElement('img');
    characterImage.src = character.images ? character.images[0] : 'Отсутствует';
    characterImage.alt = character.name;
    characterImage.className = 'character-image';
    characterImage.id = character.id;

    const characterName = document.createElement('h3');
    characterName.textContent = character.name;

    characterBlock.appendChild(characterLink);
    characterBlock.appendChild(characterImage);
    characterBlock.appendChild(characterName);

    return characterBlock;
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('isDarkTheme', isDarkTheme);
    audioElement.play();
}
