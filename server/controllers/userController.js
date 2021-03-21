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
        res.render('home', { rows });
     } else {
         console.log(err);
     }
        console.log('The data from the user table: \n', rows);
        });
    });
};

exports.viewUser = (req, res) => {
    pool.getConnection((err, conn) =>  {
        if(err) throw err; // not connected
        console.log(`Connected as ID ${conn.threadId}`);
    conn.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (err, rows) => {
    conn.release();
    if (!err){
        res.render('viewuser', { rows });
     } else {
         console.log(err);
     }
        console.log('The data from the user table: \n', rows);
        });
    });
};

exports.find = (req, res) => {
    pool.getConnection((err, conn) =>  {
    if(err) throw err; // not connected
    console.log(`Connected as ID ${conn.threadId}`);
    let searchTerm = req.body.search;
    conn.query('SELECT * FROM users WHERE firstname LIKE ? OR lastname LIKE ?',['%' + searchTerm + '%','%' + searchTerm + '%'], (err, rows) => {
    conn.release();
    if (!err){
        res.render('home', { rows });
    } else {
        console.log(err);
    }
        console.log('The data from the user table: \n', rows);
        });
    });
}

exports.form = (req, res) => {
    res.render('adduser', {title: "Add user"});
}

exports.create = (req, res) => {
    const { firstname, lastname, email, phone, comments } = req.body;
    pool.getConnection((err, conn) =>  {
        if(err) throw err; // not connected
        console.log(`Connected as ID ${conn.threadId}`);
        conn.query('INSERT INTO users SET firstname = ?, lastname = ?, email = ?, phone = ?, comments = ?',[firstname, lastname, email, phone, comments], (err, rows) => {
        conn.release();
        if (!err){
            res.render('adduser', { alert: "User added successfully.", title: "Add user" });
        } else {
            console.log(err);
        }
            console.log('The data from the user table: \n', rows);
            });
        });
}

exports.edit = (req, res) => {
    pool.getConnection((err, conn) =>  {
        if(err) throw err; // not connected
        console.log(`Connected as ID ${conn.threadId}`);
    conn.query("SELECT * FROM users WHERE id = ?",[req.params.id], (err, rows) => {
    conn.release();
    if (!err){
        res.render('edituser', {title: 'Edit user', rows});
     } else {
         console.log(err);
     }
        console.log('The data from the user table: \n', rows);
        });
    });
}

exports.updateUser = (req, res) => {
    const { firstname, lastname, email, phone, comments } = req.body;

    pool.getConnection((err, conn) =>  {
        if(err) throw err; // not connected
        console.log(`Connected as ID ${conn.threadId}`);
    conn.query("UPDATE users SET firstname = ?, lastname = ? WHERE id = ?",[firstname, lastname, req.params.id], (err, rows) => {
    conn.release();
    if (!err){
        pool.getConnection((err, conn) =>  {
            if(err) throw err; // not connected
            console.log(`Connected as ID ${conn.threadId}`);
        conn.query("SELECT * FROM users WHERE id = ?",[req.params.id], (err, rows) => {
        conn.release();
        if (!err){
            res.render('edituser', {title: 'Edit user', rows});
         } else {
             console.log(err);
         }
            console.log('The data from the user table:', rows);
            });
        });
     } else {
         console.log(err);
     }
        console.log('The data from the user table: \n', rows);
        });
    });
}