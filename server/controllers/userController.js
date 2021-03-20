const mysql = require('mysql');

// Connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connect to DB
pool.getConnection((err, conn) =>  {
    if(err) throw err; // not connected
    console.log(`Connected as ID ${conn.threadId}`);
});

exports.view = (req, res) => {
    res.render('index');
};