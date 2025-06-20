const mysql2 = require('mysql2/promise');

module.exports = mysql.createPool({
    host                : 'localhost',
    user        : 'root',
    database    : 'DogWalkService',
    waitForConnections
})