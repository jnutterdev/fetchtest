const pool = require('../models/db');

exports.view = (req, res) => {
    
    pool.getConnection((err, conn, next) =>  {
        try {
            const result = 
            await conn.query('SELECT * FROM users WHERE status = "active"', (err, rows) => {
                conn.release();
                if (!err){
                res.render('home', { rows });
                } else {
                console.log(err);
                }
                console.log('The data from the user table: \n', rows);
              })   
        } catch (error) {
            return next(error)
        }
       
    });
};

exports.viewUser = (req, res) => {
    pool.getConnection((err, conn) =>  {
        if(err) throw err;
        console.log(`Connected as ID ${conn.threadId}`);
        conn.query("SELECT * FROM users WHERE id = ?",[req.params.id], (err, rows) => {
        conn.release();
        if (!err){
            res.render('viewuser', { rows, title: "User profile" });
        } else {
            console.log(err);
        }
            console.log('The data from the user table: \n', rows);
            });
        });
};

exports.find = (req, res) => {
    pool.getConnection((err, conn) =>  {
    if(err) throw err;
    console.log(`Connected as ID ${conn.threadId}`);
    let searchTerm = req.body.search;
    conn.query('SELECT * FROM users WHERE status = "active" AND firstname LIKE ? OR lastname LIKE ?',['%' + searchTerm + '%','%' + searchTerm + '%'], (err, rows) => {
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
        if(err) throw err;
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
        if(err) throw err;
        console.log(`Connected as ID ${conn.threadId}`);
    conn.query("SELECT * FROM users WHERE id = ?",[req.params.id], (err, rows) => {
    conn.release();
    if (!err){
        res.render('edituser', {title: 'Update user', rows});
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
        if(err) throw err;
        console.log(`Connected as ID ${conn.threadId}`);
    conn.query("UPDATE users SET firstname = ?, lastname = ?, email = ?, phone = ?, comments =? WHERE id = ?",[firstname, lastname, email, phone, comments, req.params.id], (err, rows) => {
    conn.release();
    if (!err){
        pool.getConnection((err, conn) =>  {
            if(err) throw err;
            console.log(`Connected as ID ${conn.threadId}`);
        conn.query("SELECT * FROM users WHERE id = ?",[req.params.id], (err, rows) => {
        conn.release();
        if (!err){
            res.render('edituser', {title: 'Edit user', rows, alert: `${firstname} has been updated!`});
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

exports.deleteUser = (req, res) => {
    pool.getConnection((err, conn) =>  {
        if(err) throw err;
        console.log(`Connected as ID ${conn.threadId}`);
    conn.query("UPDATE users SET status = ? WHERE id = ?",['inactive', req.params.id], (err, rows) => {
    conn.release();
    if (!err){
        res.redirect('/');
     } else {
         console.log(err);
     }
        console.log('The data from the users table: \n', rows);
        });
    });
}