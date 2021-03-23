const db = require('../models/db');


exports.dbCreate = ((req, res) => {

    db.connect((err) => {
        if(err){
            throw err;
        }
        console.log("MySQL connected...");
        let sql = 'CREATE DATABASE IF NOT EXISTS user_management';
        
        db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Database created...');
    });
    });
});

exports.dbCreateTable = ((req, res) => {
    let sql = `CREATE TABLE IF NOT EXISTS users (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(30) NOT NULL,
        lastname VARCHAR(30) NOT NULL,
        email VARCHAR(50),
        phone VARCHAR(50),
        comments TEXT,
        status VARCHAR(45) DEFAULT('active')
        ); `

        db.query(sql, (err, results) => {
            if(err) throw err;
            console.log(results);
            res.send('Tables created...');
        });
});

