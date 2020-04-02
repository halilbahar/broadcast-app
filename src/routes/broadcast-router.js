const express = require('express');
const router = express.Router();

const authentication = require('../middleware/authentication-middleware');
const fileValidation = require('../middleware/file-validation-middleware');
const upload = require('../middleware/file-middleware');

const Ffmpeg = require('../Ffmpeg');
const global = require('../global');

router.get('/', (req, res) => {
    if (global.command != null) {
        res.status(200).json({ name: global.command.getName() });
    } else {
        res.sendStatus(404);
    }
});

router.delete('/', authentication, (req, res) => {
    if (global.command != null) {
        global.command.stopStream();
        global.command = null;
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', authentication, upload.single('broadcast'), fileValidation, (req, res) => {
    if (global.command != null) {
        global.command.stopStream();
        global.command = null;
    }

    global.command = new Ffmpeg(req.file.buffer, req.file.originalname);
    global.command.startStream();
    res.sendStatus(204);
});

module.exports = router;