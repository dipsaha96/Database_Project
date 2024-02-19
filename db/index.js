const Pool = require('pg').Pool;

const pool = new Pool({
    user : "postgres",
    password : "password",
    host : "localhost",
    port : 5432,
    database : "STUDENT_DATABASE"
});

module.exports = pool;
