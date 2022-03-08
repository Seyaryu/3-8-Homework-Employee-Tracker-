DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

use employee_db;

create table department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) Not Null
);

create table role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30) not null,
    salary DECIMAL not null,
    department_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) 
    REFERENCES department(id) 
    ON DELETE SET NULL        
);

create Table employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) not null,
    last_name VARCHAR(30) not null,
    role_id int,
    manager_name VARCHAR(30),
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL    
);