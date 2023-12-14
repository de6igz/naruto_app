function searchCharacter() {
    const searchInput = document.getElementById('searchInput');
    const characterContainer = document.getElementById('characterContainer');
    const resultContainer = document.getElementById('resultContainer');

    // Получаем значение из поля ввода
    const characterName = searchInput.value.trim();

    // Проверяем, что введено имя персонажа
    if (!characterName) {
        alert('Введите имя персонажа');
        return;
    }

    // Формируем URL для запроса
    // const apiUrl = `https://narutodb.xyz/api/character/search?name=${encodeURIComponent(characterName)}`;
    const apiUrl = 'https://narutodb.xyz/api/character?page=1&limit=1431'; // Замените на реальный URL вашего API

    // Отправляем запрос на сервер
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            characterContainer.style.display = 'none';
            resultContainer.style.display = 'none';
            if (!data || !data.characters || !Array.isArray(data.characters)) {
                console.error('Invalid data format:', data);
                return;
            }

            const characters = data.characters;
            const characterBlocks = [];

            characters.forEach(character => {
                try {
                    if (character.name.includes(characterName)) {
                        console.log(character);
                        const characterBlock = createCharacterBlock(character);
                        characterBlocks.push(characterBlock);
                    }
                } catch (error) {
                    console.error('Error creating character block:', error);
                }
            });

            // Очищаем контейнер и добавляем все блоки одновременно
            characterContainer.innerHTML = '';
            characterBlocks.forEach(characterBlock => {
                characterContainer.appendChild(characterBlock);
            });

            // Показываем контейнер
            characterContainer.style.display = 'block';
        })
        .catch(error => console.error('Error fetching characters:', error));

    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    //     // Скрываем все блоки
    //     characterContainer.style.display = 'none';
    //     resultContainer.style.display = 'none';
    //     console.log(data)
    //     // Проверяем, что сервер вернул статус 200
    //     if (data.name.contains(characterName)) {
    //         // Выводим информацию о персонаже
    //         const character = data; // Предполагаем, что возвращается только один результат
    //         console.log(character)
    //         if (character) {
    //             const characterBlock = createCharacterBlock(character);
    //             characterContainer.innerHTML = '';
    //             characterContainer.appendChild(characterBlock);
    //             characterContainer.style.display = 'block';
    //         } else {
    //             resultContainer.textContent = 'Персонаж не найден';
    //             resultContainer.style.display = 'block';
    //         }
    //     } else {
    //         console.log(data)
    //         resultContainer.textContent = 'Ошибка при выполнении запроса';
    //         resultContainer.style.display = 'block';
    //     }
    // })
    // .catch(error => {
    //     console.error('Ошибка:', error);
    //     resultContainer.textContent = 'Произошла ошибка';
    //     resultContainer.style.display = 'block';
    // });
}

function createCharacterBlock(character) {
    const characterBlock = document.createElement('div');
    characterBlock.className = 'character-block';

    const characterLink = document.createElement('a');
    characterLink.text = 'Подробнее'
    characterLink.href = '/character?id=' + character.id;

    const characterImage = document.createElement('img');
    characterImage.src = character.images[0]; // Используем только первое изображение
    characterImage.alt = character.name;
    characterImage.className = 'character-image';
    characterImage.id = character.id;

    const characterName = document.createElement('h3');
    characterName.textContent = character.name;

    characterBlock.appendChild(characterImage);
    characterBlock.appendChild(characterName);
    characterBlock.appendChild(characterLink);

    return characterBlock;
}
