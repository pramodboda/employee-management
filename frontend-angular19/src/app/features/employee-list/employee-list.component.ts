import { Component, OnInit } from '@angular/core';

import { Employee } from '../../core/models/Employee';
import { EmployeeService } from '../../core/services/EmployeeService';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe((data) => {
      this.employees = data;
    });
  }

  updateEmployee(id: number) {
    // Navigate to update employee component
  }

  deleteEmployee(id: number) {
    // Call service to delete employee
  }
}
