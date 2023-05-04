const knex = require('knex');
const ApiError = require('../error/ApiError')
const configs = require('../config/config')
const db = knex(configs.development.database)


class purposeController {

    // добавление подчиненных
    async create(req, res, next) {
        try {
            const {id_user_supervisor, id_user_subordinate} = req.body
            const purpose = await db('purpose')
                .insert({
                    'id_user_supervisor': id_user_supervisor,
                    'id_user_subordinate': id_user_subordinate
                })
                .returning(db.raw('*'))

            return res.json(purpose)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    // получение всех подчиненных авторизованного пользователя
    async getUserPurpose(req, res, next) {
        try {
            const {id_user_supervisor} = req.params

            const purpose = await db('purpose')
                .where({'purpose.id_user_supervisor': id_user_supervisor})
                .join('user', 'purpose.id_user_subordinate', '=', 'user.id_user')
                .select(
                    'purpose.id_purpose',
                    'purpose.id_user_subordinate',
                    'user.id_user',
                    'user.first_name',
                    'user.last_name',
                    'user.middle_name',
                )

            const isSupervisor = purpose.length > 0;// проверка на Руководителя
            const subordinate = purpose;
            const result = {isSupervisor, subordinate};

            res.json(result);
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new purposeController()