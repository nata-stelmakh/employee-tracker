//dependencies
var mysql = require("mysql");
var inquirer = require("inquirer")
//connection with database
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

//starting function 
function init() {
  inquirer
    .prompt([
      {
        //list of choices
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
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then((response) => {
      //how to close ann app
      if (response.team === "Exit") {
        console.log("No problem!See you next time!");
        connection.end();
      } else {
        //list of functions that gonna handle different responses
        switch (response.team) {
          case "View  Employees":
            //pull all the employees from the data base and display in console in table
            connection.query(`SELECT e.id, e.first_name, e.last_name, r.title, r.salary, em.first_name as "manager first name" FROM employees e
            LEFT JOIN employees em ON e.manager_id = em.id
            INNER JOIN roles r ON e.role_id = r.id`, function (err, res) {
              if (err) throw err;
              console.table(res)
              init();
            });
            break;
          case "View Departments":
            //pull all the departments from db and display in console in table
            connection.query("SELECT * FROM departments", function (err, res) {
              if (err) throw err;
              console.table(res)
              init();
            });
            break;
          case "View Roles":
            //pull all the roles from the data base and display in console in table
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
          case "Add Department":
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
//fuctions that help to manipulate users input
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
        message: "Please enter role id of your employee",
      },
      {
        type: "input",
        name: "manager_id",
        message: "Who will be the manager of your employee(put the id of a manager)?",
      },
    ])
    .then((resp) => {
      connection.query(
        //formulating  command to insert info into db 
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
        message: "Please enter name of a new department",
      }
    ])
    .then((resp) => {
      connection.query(
        "INSERT INTO departments (name) VALUES (?)",
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
        [resp.title, parseFloat(resp.salary), parseInt(resp.department_id)],
        function (err, result) {
          if (err) throw err;
          init()
        }
      );
    });
}

let roles = []
let employeesList = []

function updateEmployeeRole() {
  //SQL Query to get roles array
  connection.query(`SELECT e.id, e.first_name, e.last_name FROM employees e`, function (err, res) {
    if (err)
      console.log(err)

    console.log(res)
    employeesList = res.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }))
    connection.query(`SELECT r.id, r.title FROM roles r`, function (err, res) {
      if (err)
        console.log(err)
      console.log(res)
      roles = res.map(({ id, title }) => ({ name: title, value: id }))
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee_id",
            message: "What is the employee's first and last name?",
            choices: employeesList//employeesList //set type to be inquirer list and research how to attribute values to user choice.
          },
          {
            type: "list",
            name: "new_role",
            message: "Please enter the new role",
            choices: roles//roles
          },
        ]).then((resp) => {//then use the ids of the values the user selected in stead of using the direct selection of the id.  The code below should stay mostly the same unless you want to implement async away here a well.
          connection.query("UPDATE employees SET role_id =? WHERE id =? ",
            [parseInt(resp.new_role), parseInt(resp.employee_id)],
            function (err, result) {
              if (err) throw err;
              console.log(result)
              console.log("IDS", parseInt(resp.employee_id), parseInt(resp.new_role))
              init()
            })
        })
    })
  })

  // //SQL Query to get employees array (order doesn't matter)
  // connection.query(`SELECT e.first_name, e.last_name FROM employees`, function (err, res) {
  //   console.log(res)
  //   employeesList = res
  // connection.query(`SELECT e.id, e.first_name, e.last_name, r.title FROM employees e  INNER JOIN roles r ON e.role_id = r.id`, function (err, res) {
  //   console.log(res)

  //});
  //Refer back to async await and try catch blocks, this will help make this easier and spare you nested callbacks

}
