const knex = require('knex');
const ApiError = require('../error/ApiError')
const configs = require('../config/config')
const db = knex(configs.development.database)

class taskController {

    // добавление задачи
    async create(req, res, next) {
        try {
            const {title, description, due_date, id_priority, id_status, id_user_сreat, id_user_responsible} = req.body
            const task = await db('task')
                .insert({
                    'title': title,
                    'description': description,
                    'due_date': due_date,
                    'id_priority': id_priority,
                    'id_status': id_status,
                    'id_user_сreat': id_user_сreat,
                    'id_user_responsible': id_user_responsible
                })
                .returning(db.raw('*'))
            return res.json(task)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // получения списка задач авторизованного пользователя
    // c атрибутом создатель или нет задачи авторизованный пользователь
    // c атрибутом просрочена или нет задача
    async getUserTask(req, res, next) {
        try {
            const {id_user_responsible} = req.params

            const currentDate = new Date().toISOString().slice(0, 10); // текущая дата в формате ISO (гггг-мм-дд)

            const task = await db('task')
                .where({'task.id_user_responsible': id_user_responsible})
                .join('user', 'task.id_user_responsible', '=', 'user.id_user')
                .join('priority', 'task.id_priority', '=', 'priority.id_priority')
                .join('status', 'task.id_status', '=', 'status.id_status')
                .join('user as user_creat', 'task.id_user_сreat', '=', 'user_creat.id_user')
                .orderBy('updated_at', 'desc')
                .select(
                    'task.id_task',
                    'task.title',
                    'task.description',
                    'task.due_date',
                    'task.created_at',
                    'task.updated_at',
                    'priority.id_priority',
                    'priority.name as priority_name',
                    'status.id_status',
                    'status.name as status_name',
                    'task.id_user_responsible',
                    'user.first_name as first_name_user_responsible',
                    'user.last_name as last_name_user_responsible',
                    'user.middle_name as middle_name_user_responsible',
                    'task.id_user_сreat',
                    'user_creat.first_name as first_name_user_сreat',
                    'user_creat.last_name as last_name_user_сreat',
                    'user_creat.middle_name as middle_name_user_сreat',
                    db.raw('case when task.id_user_responsible = task.id_user_сreat then true else false end as "isUpdateTask"'),
                    db.raw(`CASE
                              WHEN task.due_date < '${currentDate}' AND task.id_status != 3 THEN 'red'  -- красный цвет для просроченных задач, кроме завершенных
                              WHEN task.id_status = 3 THEN 'green'  -- зеленый цвет для завершенных задач
                              ELSE 'gray'  -- серый цвет для остальных задач
                            END AS status_color`),
                );

            res.json(task);


        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // получения списка задач подчиненных авторизованного пользователя
    // c атрибутом создатель или нет задачи авторизованный пользователь
    // c атрибутом просрочена или нет задача
    async getPurposeTask(req, res, next) {

        try {
            const {id_user_responsible} = req.params

            const currentDate = new Date().toISOString().slice(0, 10); // текущая дата в формате ISO (гггг-мм-дд)


            const taskPurpose = await db('task')
                .leftJoin('user', 'task.id_user_responsible', 'user.id_user')
                .leftJoin('user as user_creat', 'task.id_user_сreat', 'user_creat.id_user')
                .leftJoin('priority', 'task.id_priority', '=', 'priority.id_priority')
                .leftJoin('status', 'task.id_status', '=', 'status.id_status')
                .whereIn('id_user_responsible', function () {
                    this.select('id_user_subordinate')
                        .from('purpose')
                        .where('id_user_supervisor', id_user_responsible);
                })
                .orderBy('updated_at', 'desc')
                .select(
                    'task.id_task',
                    'task.title',
                    'task.description',
                    'task.due_date',
                    'task.created_at',
                    'task.updated_at',
                    'priority.id_priority',
                    'priority.name as priority_name',
                    'status.id_status',
                    'status.name as status_name',
                    'task.id_user_responsible',
                    'user.first_name as first_name_user_responsible',
                    'user.last_name as last_name_user_responsible',
                    'user.middle_name as middle_name_user_responsible',
                    'task.id_user_сreat',
                    'user_creat.first_name as first_name_user_сreat',
                    'user_creat.last_name as last_name_user_сreat',
                    'user_creat.middle_name as middle_name_user_сreat',
                    db.raw('case when task.id_user_responsible = task.id_user_сreat then true else false end as "isUpdateTask"'),
                    db.raw(`CASE
                              WHEN task.due_date < '${currentDate}' AND task.id_status != 3 THEN 'red'  -- красный цвет для просроченных задач, кроме завершенных
                              WHEN task.id_status = 3 THEN 'green'  -- зеленый цвет для завершенных задач
                              ELSE 'gray'  -- серый цвет для остальных задач
                            END AS status_color`),
                );

            res.json(taskPurpose);

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // изменение задачи
    async update(req, res, next) {
        try {
            const {id_task, title, description, due_date, id_priority, id_status, id_user_responsible} = req.body
            const task = await db('task')
                .where('id_task', id_task)
                .update({
                    title: title,
                    description: description,
                    due_date: due_date,
                    id_priority: id_priority,
                    id_status: id_status,
                    id_user_responsible: id_user_responsible,
                    updated_at: new Date(),
                });
            return res.json(task)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new taskController()