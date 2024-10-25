const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: '172.234.80.216',
    port: 3306,
    user: 'hothaan',
    password: 'theHothaan@!',
    database: 'thehothaan',
    connectionLimit: 5,
    charset: 'utf8mb4' // UTF-8 인코딩 설정
});

module.exports = pool;
