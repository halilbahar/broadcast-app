const { key } = require('../global');

module.exports = (req, res, next) => {
    if (!req.headers.key || req.headers.key !== key) {
        res.sendStatus(401);
    } else {
        setTimeout(() => next(), 250);
    }
}