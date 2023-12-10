const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Указываем Express обслуживать статические файлы из папки public
app.use(express.static(__dirname +'/src'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/ui/StartScreen', 'StartScreen.html'));
});

app.get('/Characters', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/ui/Characters', 'Characters.html'));
});

app.get('/character', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/ui/CharacterInfo', 'CharacterInfo.html'));
});

if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker зарегистрирован:', registration);
        })
        .catch((error) => {
            console.error('Ошибка при регистрации Service Worker:', error);
        });
}
app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'manifest.json'));
});


app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});