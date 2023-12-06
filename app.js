const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Указываем Express обслуживать статические файлы из папки public
app.use(express.static('/src/ui'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/ui/StartScreen', 'StartScreen.html'));
});
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});