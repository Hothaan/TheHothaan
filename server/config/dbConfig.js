require('dotenv').config();

const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 5,
    charset: 'utf8mb4', // UTF-8 인코딩 설정
    multipleStatements: true // 여러 행을 반환할 수 있도록 설정
});

module.exports = pool;
