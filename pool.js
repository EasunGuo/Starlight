/**
 * 创建数据库连接池
 */
const mysql = require('mysql');
let pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'starlight',
    connectionLimit: 5
});
module.exports = pool;