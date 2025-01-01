# Employee Management

## Technnologies

![](https://skillicons.dev/icons?i=html,css,js,typescript,angular,materialui&)

![](https://skillicons.dev/icons?i=java,spring,mysql,postman,git,github&)

## Project Overview

CRUD Features:

- C - Create Employee
- R - Read List of Employees
- U - Update Employee
- D - Delete Employee
- View Employee
- Form Validation
- Error Handling

Required tools:

- OS: macOS Catalina - v10.15.7
- NVM: v0.40.1
- Node: v22.11.0
- Angular CLI: v19.0.2
- Spring Boot: 3.4.0
- Java: v17

### Check whether 'nvm' is installed or not

```terminal
nvm --version
```

### Check whether 'node' installed or not

```terminal
node -v
//or
node --version
```

### Check whether 'ng' is installed or not

```terminal
ng v
// or
ng --version
```

## Step 1: Create Spring Boot Backend

1. Create a Spring Boot Project:
   Use Spring Initializr to create a new project with the following dependencies: Spring Web, Spring Data JPA, and MySQL Driver.
   Name the project `backend-springboot` and the package `com.example.backend-springboot`.
2. Configure MySQL Database:
   In `application.properties`, configure the database connection

## Step 2: Set Up the Spring Boot Backend

```text
spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## Run the Angular Application:

`ng serve`

## Frontend urls:

http://localhost:4200/employees

## Backend urls:

http://localhost:8080/api/v1/employees
