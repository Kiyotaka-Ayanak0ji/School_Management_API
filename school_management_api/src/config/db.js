//Database connection
const mysql2 = require('mysql2');
require('dotenv').config();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

pool.getConnection((err,connection) => {
    if(err){
        console.error("DB connection Failed", err.message);
        process.exit(1);
    }
    console.log("DB connection successful");
    connection.release();
});

module.exports = promisePool;
