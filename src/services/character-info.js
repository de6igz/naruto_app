const audioElement = new Audio('../../resources/audio/theme-switch.mp3');

document.addEventListener('DOMContentLoaded', function () {

    const isDarkTheme = localStorage.getItem('isDarkTheme') === 'true';
    const body = document.body;
    if (isDarkTheme) {
        body.classList.add('dark-theme');
    }


    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get('id');


    if (characterId) {

        const apiUrl = `https://narutodb.xyz/api/character/${characterId}`;


        fetch(apiUrl)
            .then(response => response.json())
            .then(character => {

                const characterDetails = createCharacterDetailsBlock(character);


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
    characterImage.src = character.images ? character.images[0] : 'Отсутствует';
    characterImage.alt = character.name;
    characterImage.className = 'character-details-image';

    const characterName = document.createElement('h2');
    characterName.textContent = character.name || 'Отсутствует';

    const debutInfo = document.createElement('p');
    const debutText = character.debut ? `Debut: ${character.debut.appearsIn} (${character.debut.anime})` : 'Debut: Отсутствует';
    debutInfo.textContent = debutText;

    const jutsuList = document.createElement('ul');
    jutsuList.innerHTML = 'Jutsu:';
    if (character.jutsu && character.jutsu.length > 0) {
        character.jutsu.forEach(jutsu => {
            const jutsuItem = document.createElement('li');
            jutsuItem.textContent = jutsu;
            jutsuList.appendChild(jutsuItem);
        });
    } else {
        const jutsuItem = document.createElement('li');
        jutsuItem.textContent = 'Отсутствует';
        jutsuList.appendChild(jutsuItem);
    }

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