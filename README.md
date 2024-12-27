# Employee Management

## Technnologies

![](https://skillicons.dev/icons?i=html,css,js,typescript,angular,materialui&)

![](https://skillicons.dev/icons?i=java,spring,mysql,postman,git,github&)

## Project Overview

CRUD Features:

- C - Create Employee
- R - List Employee
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

## Step 1: Set Up the Spring Boot Backend

1. Create a Spring Boot Project:
   Use Spring Initializr to create a new project with the following dependencies: Spring Web, Spring Data JPA, and MySQL Driver.
   Name the project `backend-springboot` and the package `com.example.backend-springboot`.
2. Configure MySQL Database:
   In `application.properties`, configure the database connection

```text
spring.datasource.url=jdbc:mysql://localhost:3306/employee_db
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Create the Employee Entity:
Java

package com.example.employeemanagement.model;

import javax.persistence.\*;

@Entity
@Table(name = "employees")
public class Employee {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email_id")
    private String emailId;

    @Column(name = "gender")
    private String gender;

    // Getters and Setters

}

#### Create the Employee Repository:

```Java

package com.example.employeemanagement.repository;

import com.example.employeemanagement.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
```

#### Create the Employee Controller:

```Java

package com.example.employeemanagement.controller;

import com.example.employeemanagement.model.Employee;
import com.example.employeemanagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.\*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id :" + id));
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id :" + id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());
        employee.setGender(employeeDetails.getGender());

        Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id :" + id));

        employeeRepository.delete(employee);
        return ResponseEntity.noContent().build();
    }

}
```

#### Step 2: Set Up the Angular Frontend

Create a New Angular Project:

```JavaScript
ng new employee-management
cd employee-management

Install Angular Material and Other Dependencies:
ng add @angular/material
npm install @angular/forms @angular/http
```

Create Employee Service:
TypeScript

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
providedIn: 'root'
})
export class EmployeeService {

private baseUrl = 'http://localhost:8080/api/v1/employees';

constructor(private http: HttpClient) { }

getEmployeesList(): Observable<Employee[]> {
return this.http.get<Employee[]>(`${this.baseUrl}`);
}

createEmployee(employee: Employee): Observable<Object> {
return this.http.post(`${this.baseUrl}`, employee);
}

getEmployeeById(id: number): Observable<Employee> {
return this.http.get<Employee>(`${this.baseUrl}/${id}`);
}

updateEmployee(id: number, employee: Employee): Observable<Object> {
return this.http.put(`${this.baseUrl}/${id}`, employee);
}

deleteEmployee(id: number): Observable<Object> {
return this.http.delete(`${this.baseUrl}/${id}`);
}
}

Create Employee Model:
TypeScript

export class Employee {
id: number;
firstName: string;
lastName: string;
emailId: string;
gender: string;
}

#### Create Components for CRUD Operations:

Generate components for listing, creating, updating, and deleting employees using Angular CLI:
ng generate component employee-list
ng generate component create-employee
ng generate component update-employee
ng generate component employee-details

Set Up Routing:
In app-routing.module.ts, define routes for the components:
TypeScript

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

const routes: Routes = [
{ path: 'employees', component: EmployeeListComponent },
{ path: 'create-employee', component: CreateEmployeeComponent },
{ path: 'update-employee/:id', component: UpdateEmployeeComponent },
{ path: 'employee-details/:id', component: EmployeeDetailsComponent },
{ path: '', redirectTo: 'employees', pathMatch: 'full' }
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }

#### Implement CRUD Operations in Components:

Implement the logic for listing, creating, updating, and deleting employees in the respective components.
Step 3: Run the Application
Run the Spring Boot Application:
mvn spring-boot:run

Run the Angular Application:
ng serve
frontend urls:
http://localhost:4200/employees

backend urls:
http://localhost:8080/api/v1/employees
