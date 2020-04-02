const { key } = require('../global');

module.exports = (req, res, next) => {
    setTimeout(() => {
        if (!req.headers.key || req.headers.key !== key) {
            res.sendStatus(401);
        } else {
            next()
        }
    }, 200)
}