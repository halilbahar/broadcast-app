const { key } = require('../global');

// Simple authenication middlware. Checks in the header for a key and compares it with the envoriment key
module.exports = (req, res, next) => {
    setTimeout(() => {
        if (!req.headers.key || req.headers.key !== key) {
            res.sendStatus(401);
        } else {
            next()
        }
    }, 200)
}