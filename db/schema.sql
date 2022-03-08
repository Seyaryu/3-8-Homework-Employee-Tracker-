DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

use employee_db;

create Table employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) not null,
    last_name VARCHAR(30) not null,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    manager_name VARCHAR(30)
);

create table role(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) not null,
    salary DECIMAL not null,
    FOREIGN key (department_id) 
    references department(id) on delete set null
);

create table department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) Not Null
);
