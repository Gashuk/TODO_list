const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const knex = require('knex')
const configs = require('../config/config')
const db = knex(configs.development.database)
const jwt = require('jsonwebtoken')

// шифрование данных пользователей
const generateJWT = (id_user, login, first_name, last_name, middle_name) => {
    return jwt.sign(
        {id_user, login, first_name, last_name, middle_name},
        configs.development.jwt.secretKey,
        {expiresIn: '24h'}
    )
}

class UserController {

    //регистрация пользователя
    async registration(req, res, next) {
        try {
            const {login, password} = req.body
            if (!login || !password) {
                return next(ApiError.badRequest('Некорректный логин или пароль'))
            }
            const candidate = await db('user')
                .where({
                    'login': login
                })
                .select('login')

            if (candidate[0]?.login === login) {
                next(ApiError.badRequest('Пользователь уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)

            const user = await db('user')
                .insert({
                    "first_name": "Иван",
                    "last_name": "Иван",
                    "middle_name": "Иван",
                    'login': login,
                    'password': hashPassword
                })
            const userId = await db('user')
                .where({
                    'login': login
                })
                .select('*')
            const tokenValue = generateJWT(userId[0].id_user, userId[0].login, userId[0].first_name, userId[0].last_name, userId[0].middle_name)
            return res.json({token: tokenValue})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    //авторизация пользователя
    async login(req, res, next) {
        try {
            const {login, password} = req.body
            const user = await db('user')
                .where({
                    'login': login
                })
            if (user[0]?.login !== login) {
                return next(ApiError.internal({login: 'Пользователь с таким логином не существует'}))
            }
            let comparePassword = bcrypt.compareSync(password, user[0].password)
            if (!comparePassword) {
                return next(ApiError.internal({password: 'Указан неверный пароль'}))
            }

            const token = generateJWT(user[0].id_user, user[0].login, user[0].first_name, user[0].last_name, user[0].middle_name)
            return res.json({'token': token})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    //проверка пользователя
    async check(req, res, next) {
        try {
            const token = generateJWT(req.user.id_user, req.user.login, req.user.first_name, req.user.last_name, req.user.middle_name)
            return res.json({token})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()