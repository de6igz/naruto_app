const villageAPI = 'https://narutodb.xyz/api/village?page=1&limit=39'
document.addEventListener('DOMContentLoaded', function () {
    const villagesContainer = document.getElementById('villagesContainer');

    // Здесь вызывайте ваш API для получения информации о деревнях
    fetch(villageAPI)
        .then(response => response.json())
        .then(data => {
            const villages = data.villages;

            villages.forEach((village, index) => {
                const villageBlock = document.createElement('div');
                villageBlock.className = 'village-block';

                const villageNumber = document.createElement('span');
                villageNumber.className = 'village-number';
                villageNumber.textContent = `${index + 1}.`;

                const villageName = document.createElement('h3');
                villageName.textContent = village.name;

                villageBlock.appendChild(villageNumber);
                villageBlock.appendChild(villageName);
                villagesContainer.appendChild(villageBlock);
            });
        })
        .catch(error => {
            console.error('Error fetching village data:', error);
        });
});
