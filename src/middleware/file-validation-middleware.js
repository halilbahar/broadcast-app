// Simple file validation, if the file doesnt exist return status code 400
module.exports = (req, res, next) => !req.file ? res.sendStatus(400) : next();