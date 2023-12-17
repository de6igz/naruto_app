const audioElement = new Audio('../../resources/audio/theme-switch.mp3');


function toggleTheme() {
    const body = document.body;


    body.classList.toggle('dark-theme');

    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('isDarkTheme', isDarkTheme);
    audioElement.play();

}


document.addEventListener('DOMContentLoaded', function() {
    const isDarkTheme = localStorage.getItem('isDarkTheme') === 'true';
    const body = document.body;
    if (isDarkTheme) {
        body.classList.add('dark-theme');
    }
});