const knex = require('knex');
const ApiError = require('../error/ApiError')
const configs = require('../config/config')
const db = knex(configs.development.database)

class statusController {

    // добавление статуса
    async create(req, res, next) {
        try {
            const {name} = req.body
            const status = await db('status')
                .insert({
                    'name': name
                })
                .returning(db.raw('*'))

            return res.json(status)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    // получения списка статусов
    async getAll(req, res, next) {
        try {
            const status = await db
                .select(['id_status', 'name'])
                .from('status')
            return res.json(status)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new statusController()