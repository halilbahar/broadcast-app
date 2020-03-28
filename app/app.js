const express = require('express');
const multer = require('multer');
const upload = multer();
const app = express();

const Ffmpeg = require('./ffmpeg');

const port = 3000;
const key = process.env.KEY || 'default';

const fs = require('fs');

if(!fs.existsSync('./audio')) {
    fs.mkdirSync('./audio');
}

app.use(express.static('public'));
app.use(upload.single('broadcast'));
app.use((req, res, next) => {
    if (!req.body || !req.body.key || req.body.key !== key) {
        res.sendStatus(401);
    } else {
        next();
    }
});

let currentCommand = null;
app.post('/new-broadcast', (req, res) => {
    if(currentCommand != null) {
        currentCommand.stopStream();
    }
    currentCommand = new Ffmpeg(req.file.buffer);
    currentCommand.startStream();
    res.sendStatus(204);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));