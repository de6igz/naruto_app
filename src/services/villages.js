const villageAPI = 'https://narutodb.xyz/api/village?page=1&limit=39'
document.addEventListener('DOMContentLoaded', function () {
    const villagesContainer = document.getElementById('villagesContainer');


    fetch(villageAPI)
        .then(response => response.json())
        .then(data => {
            const villages = data.villages;

            villages.forEach(village => {
                const listItem = document.createElement('li');
                listItem.textContent = village.name;
                villagesList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching village data:', error);
        });
});
