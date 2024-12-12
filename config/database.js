

const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost', // Database host
    user: 'root',      // MySQL username
    password: '',      // MySQL password (leave empty if none)
    database: 'data' // Database name
});



module.exports= connection