module.exports = (req, res, next) => !req.file ? res.sendStatus(400) : next();