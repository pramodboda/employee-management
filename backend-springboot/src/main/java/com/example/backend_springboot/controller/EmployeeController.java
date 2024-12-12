package com.example.backend_springboot.controller;


import com.example.backend_springboot.exception.ResourceNotFoundException;
import com.example.backend_springboot.model.Employee;
import com.example.backend_springboot.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    // get all employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // create employees rest api
    @PostMapping("/employees")
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee) {
        if (employee.getEmailId() == null || employee.getEmailId().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email ID is required"));
        }

        // Proceed with saving the employee to the database
        Employee savedEmployee = employeeRepository.save(employee);
        System.out.println("Saved Employee: " + savedEmployee);

        // Return a JSON response with success message and employee details (optional)
        return ResponseEntity.ok(Map.of(
                "message", "Employee created successfully",
                "employeeId", savedEmployee.getId(),
                "employeeName", savedEmployee.getFirstName()
        ));
    }


    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id :" + id));
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not found with id :" + id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());
        employee.setGender(employeeDetails.getGender());

        Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("employees/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id :" + id));

        employeeRepository.delete(employee);
        return ResponseEntity.noContent().build();
    }
}
