let mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit : 10,
    timeout  : 5000,
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'home_gestion'
});

pool.getConnection((err, connection) => {
    if(!err) {
        console.log('connected');
    } else {
        console.log(err);
    }
});

pool.on('error', function(err) {
    console.log(err.code); // 'ER_BAD_DB_ERROR'
    // https://www.npmjs.com/package/mysql#error-handling
});

module.exports = pool;