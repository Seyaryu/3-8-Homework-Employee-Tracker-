const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');
require('dotenv').config();


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'employee_db'
});

connection.connect(err => {
  if(err) throw err;
  console.log('Now Listening');
  startApp();
})

function startApp() {
  console.log("***********************************")
  console.log("*                                 *")
  console.log("*        EMPLOYEE MANAGER         *")
  console.log("*                                 *")
  console.log("***********************************")

  initPrompt();

  function initPrompt() {
      inquirer.prompt([
          {
              message: 'Please select from the following:',
              type: 'list',
              name: 'options',
              choices: ['View all departments', 
                        'View all roles', 
                        'View all employees', 
                        'Add a department', 
                        'Add a role', 
                        'Add an employee', 
                        'Update an employee role',
                        'Exit'] 
          }
      ]).then((choices) => {
          const choice = choices.options;

          if (choice === "View all departments") {
              showDepts();
          } 
          if (choice === "View all roles") {
              showRoles();
          } 
          if (choice === "View all employees") {
              showEmployees();
          } 
          if (choice === "Add a department") {
              addDept();
          } 
          if (choice === "Add a role") {
              addRole();
          } 
          if (choice === "Add an employee") {
              addEmployee();
          } 
          if (choice === "Update an employee role") {
              updateEmployee();
          }  
          if (choice === "Exit") {
            console.log("Now Exiting Program");
            process.exit(1);
        }    
      });
  };

  function showDepts() {
    connection.query('SELECT * FROM department', (err, res) => {
      if (err) throw err;
      console.table(res);
      initPrompt();
    })

  };

  function showRoles() {
    connection.query('SELECT * FROM role', (err, res) => {
      if (err) throw err;
      console.table(res);
      initPrompt();
    })
  };

  function showEmployees() {
    connection.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      console.table(res);
      initPrompt();
    })    
  };

  function addDept() {

      initPrompt();
  };

  function addRole() {

      initPrompt();
  };

  function addEmployee() {

      initPrompt();
  };

  function updateEmployee() {

      initPrompt();
  };
};