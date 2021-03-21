const mysql = require('mysql');

// Connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

exports.view = (req, res) => {

    pool.getConnection((err, conn) =>  {
        if(err) throw err; // not connected
        console.log(`Connected as ID ${conn.threadId}`);
   
    conn.query('SELECT * FROM users', (err, rows) => {
    conn.release();

    if (!err){
        res.render('index', { rows });
     } else {
         console.log(err);
     }
        console.log('The data from the user table: \n', rows);
        });
    });
};

