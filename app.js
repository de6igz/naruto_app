const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Указываем Express обслуживать статические файлы из папки public
app.use(express.static(__dirname +'/src'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/ui/StartScreen', 'StartScreen.html'));
});

app.get('/characters', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/ui/Characters', 'Characters.html'));
});
app.get('/villages', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/ui/Villages', 'Villages.html'));
});
app.get('/character', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/ui/CharacterInfo', 'CharacterInfo.html'));
});
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});