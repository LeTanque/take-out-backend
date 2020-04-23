const serverEnvironment = process.env.DB_ENV || 'development';
const knexfileConfig = require("../knexfile")[serverEnvironment];

module.exports = require('knex')(knexfileConfig);
