const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const port = 3001;

const fs = require('fs');


// Указываем Express обслуживать статические файлы из папки public
app.use(express.static(__dirname +'/src'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/ui/StartScreen', 'StartScreen.html'));
});
app.post("/subscription", (req, res) => {
    const pushSubscription = req.body;
    fs.writeFileSync("subscription.json", JSON.stringify(pushSubscription));
    res.status(200).send("OK");
});

app.get('/characters', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/ui/Characters', 'Characters.html'));
});
app.get('/villages', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/ui/Villages', 'Villages.html'));
});

app.get('/clans', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/ui/Clans', 'Clans.html'));
});
app.get('/character', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/ui/CharacterInfo', 'CharacterInfo.html'));
});
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});