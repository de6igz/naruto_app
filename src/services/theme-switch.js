function toggleTheme() {
    const body = document.body;

    // Переключение темы с помощью добавления/удаления класса "dark-theme"
    body.classList.toggle('dark-theme');

    // Сохранение выбранной темы в локальном хранилище
    const isDarkTheme = body.classList.contains('dark-theme');
    localStorage.setItem('isDarkTheme', isDarkTheme);
}

// Применение сохраненной темы при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const isDarkTheme = localStorage.getItem('isDarkTheme') === 'true';
    const body = document.body;
    if (isDarkTheme) {
        body.classList.add('dark-theme');
    }
});