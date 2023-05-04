exports.up = async function (knex) {

    //таблица "Пользователь"
    await knex.schema.createTable('user', table => {
        table.increments('id_user').primary();
        table.string('first_name', 50).notNullable();
        table.string('last_name', 50).notNullable();
        table.string('middle_name', 50).notNullable();
        table.string('login', 50).notNullable().unique();
        table.string('password', 100).notNullable();
    });

    //таблица "Статус"
    await knex.schema.createTable('status', table => {
        table.increments('id_status').primary();
        table.string('name', 50).notNullable().unique();
    });

    //таблица "Приоритет"
    await knex.schema.createTable('priority', table => {
        table.increments('id_priority').primary();
        table.string('name', 50).notNullable().unique();
    });

    //таблица "Задача"
    await knex.schema.createTable('task', table => {
        table.increments('id_task').primary();
        table.string('title', 100).notNullable();
        table.text('description').notNullable();
        table.dateTime('due_date').notNullable();
        table.dateTime('created_at').defaultTo(knex.fn.now()).notNullable();
        table.dateTime('updated_at').defaultTo(knex.fn.now()).notNullable();

        table.integer('id_priority').references('id_priority').inTable('priority');
        table.integer('id_status').references('id_status').inTable('status');
        table.integer('id_user_сreat').references('id_user').inTable('user');
        table.integer('id_user_responsible').references('id_user').inTable('user');
    });

    //таблица "Назначение"
    await knex.schema.createTable('purpose', table => {
        table.increments('id_purpose').primary();
        table.integer('id_user_supervisor').references('id_user').inTable('user');
        table.integer('id_user_subordinate').references('id_user').inTable('user');
    });

};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('task');
    await knex.schema.dropTableIfExists('priority');
    await knex.schema.dropTableIfExists('status');
    await knex.schema.dropTableIfExists('user');
    await knex.schema.dropTableIfExists('purpose');
};
