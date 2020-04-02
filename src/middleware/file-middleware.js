const multer = require('multer');
const upload = multer({
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'audio/mpeg' || file.mimetype === 'audio/mp3') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

// This is the middleware for using multipart
module.exports = upload;