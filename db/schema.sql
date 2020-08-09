DROP DATABASE IF EXISTS database_db;
CREATE DATABASE database_db; ;
USE database_db;

CREATE TABLE departments
(
	id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE roles
(
	id INTEGER NOT NULL AUTO_INCREMENT,
	title VARCHAR(30) NOT NULL,
	salary DECIMAL(10,4),
    department_id INTEGER(100),
	PRIMARY KEY (id)
);

CREATE TABLE employees
(
	id int NOT NULL AUTO_INCREMENT,
	 first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     role_id INTEGER(10),
     manager_id INTEGER(100),
     PRIMARY KEY (id)
);