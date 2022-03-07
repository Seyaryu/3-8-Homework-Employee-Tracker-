const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const sequelize = require('./config/connection');


  // turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});