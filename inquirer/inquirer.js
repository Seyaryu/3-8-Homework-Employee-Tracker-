const inquirer = require('inquirer');
const express = require('express');
const cTable = require('console.table');

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
            choices = ['View all departments', 
                        'View all roles', 
                        'View all employees', 
                        'Add a department', 
                        'Add a role', 
                        'Add an employee', 
                        'Update an employee role']
        }
    ]).then((choices) => {
        const {choice} = choices;

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