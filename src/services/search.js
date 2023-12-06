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
    const apiUrl = `https://narutodb.xyz/api/character/search?name=${encodeURIComponent(characterName)}`;

    // Отправляем запрос на сервер
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Скрываем все блоки
            characterContainer.style.display = 'none';
            resultContainer.style.display = 'none';

            // Проверяем, что сервер вернул статус 200
            if (data.name === characterName) {
                // Выводим информацию о персонаже
                const character = data; // Предполагаем, что возвращается только один результат
                console.log(character)
                if (character) {
                    const characterBlock = createCharacterBlock(character);
                    characterContainer.innerHTML = '';
                    characterContainer.appendChild(characterBlock);
                    characterContainer.style.display = 'block';
                } else {
                    resultContainer.textContent = 'Персонаж не найден';
                    resultContainer.style.display = 'block';
                }
            } else {
                console.log(data)
                resultContainer.textContent = 'Ошибка при выполнении запроса';
                resultContainer.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            resultContainer.textContent = 'Произошла ошибка';
            resultContainer.style.display = 'block';
        });
}

function createCharacterBlock(character) {
    const characterBlock = document.createElement('div');
    characterBlock.className = 'character-block';

    const characterImage = document.createElement('img');
    characterImage.src = character.images[0];
    characterImage.alt = character.name;
    characterImage.className = 'character-image';
    characterImage.id = character.id;

    const characterName = document.createElement('h3');
    characterName.textContent = character.name;

    characterBlock.appendChild(characterImage);
    characterBlock.appendChild(characterName);

    return characterBlock;
}
