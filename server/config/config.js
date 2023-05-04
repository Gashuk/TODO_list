module.exports = {
    development: {
        database: {
            client: 'postgresql',
            connection: {
                database: 'todo_list',
                user: 'postgres',
                password: 'postgres',
                host: 'localhost',
                port: '5432'
            },
            migrations: {
                tableName: 'migrations',
                directory: './db/migrations'
            },
            seeds: {
                directory: './db/seeds'
            }
        },
        jwt: {
            secretKey: 'secret-jwt'
        }
    }
}