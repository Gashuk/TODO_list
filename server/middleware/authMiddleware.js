const jwt = require('jsonwebtoken')
const configs = require('../config/config')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(401).json({message: 'Не авторизован'})
        }
        const decoded = jwt.verify(token, configs.development.jwt.secretKey)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: 'Не авторизован'})
    }
}