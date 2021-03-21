CREATE DATABASE IF NOT EXISTS user_management;

CREATE TABLE users (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(50),
phone VARCHAR(50),
comments TEXT,
status VARCHAR(45) DEFAULT('active')
); 

INSERT INTO users (firstname, lastname, email, phone, comments, status)
VALUES ('Erika', 'Martinez Nutter', 'straightlacedx@email.com', '4041234567', 'I teach, therefor I am', 'active'); 