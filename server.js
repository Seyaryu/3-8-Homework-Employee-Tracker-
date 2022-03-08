const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');
const sequelize = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

  // turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
}).then(startApp());

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
      // console.table('employee_db', [...]);

      initPrompt();
  };

  function showRoles() {

      initPrompt();
  };

  function showEmployees() {

      initPrompt();
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