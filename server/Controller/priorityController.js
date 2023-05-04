const knex = require('knex');
const ApiError = require('../error/ApiError')
const configs = require('../config/config')
const db = knex(configs.development.database)

class priorityController {

    // добавление приоритета
    async create(req, res, next) {
        try {
            const {name} = req.body
            const priority = await db('priority')
                .insert({
                    'name': name
                })
                .returning(db.raw('*'))

            return res.json(priority)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    // получения списка приоритетов
    async getAll(req, res, next) {
        try {
            const priority = await db
                .select(['id_priority', 'name'])
                .from('priority')
            return res.json(priority)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new priorityController()