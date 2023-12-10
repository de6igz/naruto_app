document.addEventListener('DOMContentLoaded', function () {
    // Получаем параметр id из query string
    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get('id');

    // Проверяем, есть ли параметр id в URL
    if (characterId) {
        // Формируем URL для запроса
        const apiUrl = `https://narutodb.xyz/api/character/${characterId}`;

        // Отправляем запрос на сервер
        fetch(apiUrl)
            .then(response => response.json())
            .then(character => {
                // Создаем блок с информацией о персонаже
                const characterDetails = createCharacterDetailsBlock(character);

                // Добавляем блок на страницу
                const characterDetailsContainer = document.getElementById('characterDetails');
                characterDetailsContainer.appendChild(characterDetails);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при получении данных о персонаже');
            });
    } else {
        alert('Не указан параметр id в URL');
    }
});

function createCharacterDetailsBlock(character) {
    const characterDetailsBlock = document.createElement('div');
    characterDetailsBlock.className = 'character-details-block';

    const characterImage = document.createElement('img');
    characterImage.src = character.images[0];
    characterImage.alt = character.name;
    characterImage.className = 'character-details-image';

    const characterName = document.createElement('h2');
    characterName.textContent = character.name;

    const debutInfo = document.createElement('p');
    debutInfo.textContent = `Debut: ${character.debut.appearsIn} (${character.debut.anime})`;

    const jutsuList = document.createElement('ul');
    jutsuList.innerHTML = 'Jutsu:';
    character.jutsu.forEach(jutsu => {
        const jutsuItem = document.createElement('li');
        jutsuItem.textContent = jutsu;
        jutsuList.appendChild(jutsuItem);
    });

    characterDetailsBlock.appendChild(characterImage);
    characterDetailsBlock.appendChild(characterName);
    characterDetailsBlock.appendChild(debutInfo);
    characterDetailsBlock.appendChild(jutsuList);

    return characterDetailsBlock;
}




function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('isDarkTheme', isDarkTheme);
    audioElement.play();
}