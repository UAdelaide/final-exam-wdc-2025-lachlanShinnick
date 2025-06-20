const mysql = require('mysql2/promise');

module.exports = mysql.createPool({
    host                : 'localhost',
    user                : 'root',
    database            : 'DogWalkService',
    waitForConnections  : true,
    connectionLimit     : 10,
    queueLimit          : 0,
    multipleStatements  : true
});