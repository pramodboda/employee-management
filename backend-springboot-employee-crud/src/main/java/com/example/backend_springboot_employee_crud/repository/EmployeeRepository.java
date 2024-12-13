//package com.example.backend_springboot.repository;
package com.example.backend_springboot_employee_crud.repository;

import com.example.backend_springboot_employee_crud.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
