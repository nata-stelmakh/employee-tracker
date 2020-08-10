INSERT INTO departments (name) VALUES('IT');
INSERT INTO departments (name) VALUES('Attorney');
INSERT INTO departments (name) VALUES('Sales');
INSERT INTO departments (name) VALUES('Finances');

INSERT INTO roles (title,salary,department_id) VALUES('Engineer','120000.50',1 );
INSERT INTO roles (title,salary,department_id) VALUES('Manager','190000.45',1 );
INSERT INTO roles (title,salary,department_id) VALUES('Analyst','95000.77' ,4);
INSERT INTO roles (title,salary,department_id) VALUES('Marketing specialist','97000',3 );
INSERT INTO roles (title,salary,department_id) VALUES('Accountant','120000',4 );

INSERT INTO employees (first_name, last_name,role_id,manager_id) VALUES('John','Majkovitz',2,0 );
INSERT INTO employees (first_name, last_name,role_id,manager_id) VALUES('Bob','Gowwe',1,1 );
INSERT INTO employees (first_name, last_name,role_id,manager_id) VALUES('Lana','Kew',4,1 );
INSERT INTO employees (first_name, last_name,role_id,manager_id) VALUES('Megan','Smith',3,1 );
INSERT INTO employees (first_name, last_name,role_id,manager_id) VALUES('Alex','Boydan',5,1 );

SELECT * FROM departments;
SELECT * FROM  employees;
SELECT * FROM roles;

SELECT employees.id, employees.first_name,employees.last_name,roles.title, roles.salary, departments.name
FROM employees
LEFT JOIN roles ON roles.id = employees.role_id
LEFT JOIN departments ON departments.id = roles.department_id
