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
    inquirer.prompt(
      {
        name: "deptName",
        type: "input",
        message: "What is the new department's name?"
      }
    ).then((answer) => {
      connection.query(`INSERT INTO department (name) Values ("${answer.deptName}");`),
      (err, res) =>{
        if (err) throw err;
        console.log(res + " has been added.");
        initPrompt();
      }
    });
  };


  //took inspiration from https://github.com/nicolewallace09/employee-tracker/blob/master/server.js
  function addRole() {
    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the new role?"
      },
      {
        type: "input",
        name: "salary",
        message: "What does this role pay annually?"
      }
    ]).then((answer) => {
      const params = [answer.title, answer.salary];
      
      connection.query(`SELECT name, id FROM department`, (err, res) => {
        if (err) throw err;

        const deptList = res.map(({name,id}) => ({name:name, value:id}));

        inquirer.prompt(
          {
            name: "dept",
            type: "list",
            message: "What department does this role belong to?",
            choices: deptList
          }
        ).then((answer) => {
          const dept = answer.dept;
          params.push(dept);

          const sql = `INSERT INTO role (title, salary, department_id)
          VALUES (?, ?, ?)`;

          connection.query(sql, params, (err, result) => {
          if (err) throw err;
          console.log('Added ' + answer.title + " to roles."); 

          initPrompt()
          })
        })
      })
      
    });
  };

  function addEmployee() {
    inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?"
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?"
      }
    ]).then((answer) => {
      const params = [answer.firstName, answer.lastName];

      connection.query(`SELECT role.id, role.title FROM role`, (err, res) => {
        if (err) throw err;

        const roleList = res.map(({id, title}) => ({name:title, value:id}));

        inquirer.prompt([
          {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: roleList
          }
        ]).then((answer) => {
          const role = answer.role;
          params.push(role);

          inquirer.prompt([
            {
              type: 'input',
              name: 'manager',
              message: 'Who is their manager?'
            }
          ]).then((answer) => {
            params.push(answer.manager);

            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_name)
            VALUES (?, ?, ?, ?)`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;

              console.log(`${params[0]} ${params[1]} has been added!`);

              initPrompt();
            })
          })
        })
      });
    })
  };

  function updateEmployee() {

      initPrompt();
  };
};