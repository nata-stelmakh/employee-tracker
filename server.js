//dependencies
var mysql = require("mysql");
var inquirer =require("inquirer")

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Dragonfly89!",
  database: "database_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  init();
});

//create a list of questions for inquirer
//functions

// build a command-line application that at a minimum allows the user to:

//   * Add departments, roles, employees

//   * View departments, roles, employees

//   * Update employee roles
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "team",
        message: "What would you like to do?",
        choices: [
          "View  Employees",
          "View Departments",
          "View Roles",
          "Add Employee",
          "Add Role",
          "Add Department",
          "Update Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then((response) => {
      if (response.team === "Exit") {
        console.log("No problem!See you next time!");
        connection.end();
      } else {
        switch (response.team) {
          case "View  Employees":
            //pull all the employees from the data base
            connection.query("SELECT * FROM employees", function (err, res) {
              if (err) throw err;
              console.table(res)
              init();
            });
            break;
          case "View Departments":
            //pull all the departments from db
            connection.query("SELECT * FROM departments", function (err, res) {
              if (err) throw err;
              console.table(res)
              init();
            });
            break;
          case "View Roles":
            //pull all the roles from the data base
            connection.query("SELECT * FROM roles", function (err, res) {
              if (err) throw err;
              console.table(res)
              init();
            });
            break;
          case "Add Employee":
            //add the employee in a db
            addEmployee();

            break;
          case "Add Departments":
            //add department in a db
            addDepartment();
            break;
          case "Add Role":
            //add  the role in a db
            addRoles();
            break;
          case "Update Employee Role":
            //update the employee in a db
            updateEmployeeRole();
            break;
        }
      }
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of your employee?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of your employee?",
      },
      {
        type: "input",
        name: "role_id",
        message: "Please enter role of your employee",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Who will be the manager of your employee(put the id of a manager)?",
      },
    ])
    .then((resp) => {
      connection.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [resp.firstName, resp.lastName, parseInt(resp.role_id), parseInt(resp.manager_id)],
        function (err, result) {
          if (err) throw err;
          init()
        }
      );
    });
  }

function addDepartment() {
    inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your department?",
      }
    ])
    .then((resp) => {
      connection.query(
        "INSERT INTO departments (name) VALUES ?",
        [resp.name],
        function (err, result) {
          if (err) throw err;
          init()
        }
      );
    });
}
function addRoles() {
    inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of a new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the salary?",
      },
      {
        type: "input",
        name: "department_id",
        message: "Please enter department id",
      }
    ])
    .then((resp) => {
      connection.query(
        "INSERT INTO roles (title,salary,department_id) VALUES (?,?,?)",
        [resp.title,parseFloat(resp.salary),parseInt( resp.department_id)],
        function (err, result) {
          if (err) throw err;
          init()
        }
      );
    });
}


function updateEmployeeRole() {
    inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
        message: "What is the  employee's id?"
      },
      {
        type: "input",
        name: "new_role",
        message: "Please enter the new role id",
      },
    ]).then((resp)=>{
    connection.query("UPDATE employees SET role_id = ? WHERE employee_id = ?",
    [resp.employee_id,resp.new_role],
        function (err, result) {
          if (err) throw err;
          init()
        })
})
}