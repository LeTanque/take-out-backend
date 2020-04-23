
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/hatch.sqlite3',
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
        directory: './data/seeds',
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './data/hatch.sqlite3',
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
        directory: './data/seeds',
    },
    useNullAsDefault: true,
  }

};
