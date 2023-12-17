const villageAPI = 'https://narutodb.xyz/api/clan?page=1&limit=58'
document.addEventListener('DOMContentLoaded', function () {
    const villagesContainer = document.getElementById('clanList');


    fetch(villageAPI)
        .then(response => response.json())
        .then(data => {
            const clans = data.clans;

            clans.forEach(clan => {
                const listItem = document.createElement('li');
                listItem.textContent = clan.name;
                clanList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching clan data:', error);
        });
});
