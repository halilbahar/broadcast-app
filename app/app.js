const express = require('express');
const multer = require('multer');
const upload = multer({
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});
const app = express();

const Ffmpeg = require('./ffmpeg');
const Message = require('./message');

const port = 3000;
const key = process.env.KEY || 'default';

const fs = require('fs');

if (!fs.existsSync('./audio')) {
    fs.mkdirSync('./audio');
}

app.use(express.static('public'));
app.use(upload.single('broadcast'));
app.use((req, res, next) => {
    if (!req.headers.key) {
        res.status(401).json(new Message('No key was provided.'));
    } else if (req.headers.key !== key) {
        res.status(401).json(new Message('A wrong key was provided.'));
    } else {
        next();
    }
});

let currentCommand = null;
app.post('/delete-broadcast', (req, res) => {
    let message = new Message();
    if (currentCommand != null) {
        currentCommand.stopStream();
        currentCommand = null;
        message.setMessage('Stopped current stream!');
    } else {
        message.setMessage('Could not stop streaming. No stream was running.')
    }

    res.status(200).json(message);
});

app.use((req, res, next) => {
    if (!req.file) {
        res.status(401).json(new Message('No file was provided or it is not a mp3.'));
    } else {
        next();
    }
});

app.post('/new-broadcast', (req, res) => {
    if (currentCommand != null) {
        currentCommand.stopStream();
        currentCommand = null;
    }
    currentCommand = new Ffmpeg(req.file.buffer);
    currentCommand.startStream();
    res.status(200).json(new Message('Started new stream!'));
});

app.listen(port, () => console.log(`Listening on port ${port}!`));