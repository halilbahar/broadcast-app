const express = require('express');
const multer = require('multer');
const upload = multer();
const app = express();

const Ffmpeg = require('./ffmpeg');
const Message = require('./message');

const port = 3000;
const key = process.env.KEY || 'default';

const fs = require('fs');

if(!fs.existsSync('./audio')) {
    fs.mkdirSync('./audio');
}

app.use(express.static('public'));
app.use(upload.single('broadcast'));
app.use((req, res, next) => {
    if (!req.body || !req.body.key) {
        res.status(401).json(new Message('No key was provided.'));
    } else if(req.body.key !== key) {
        res.status(401).json(new Message('A wrong key was provided.'));
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
    res.status(200).json(new Message('Started new stream!'));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));