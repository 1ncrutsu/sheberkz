const { Pool } = require('pg');

const pool = new Pool({
    user: 'admin',
    password: 'root',
    host: '127.0.0.1',
    port: 5444,
    database: 'my_database'
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};