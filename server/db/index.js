const knex = require('knex');
const config = require('./config/config')
const db = knex(config.development.database)
module.exports = db