import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '../../core/models/Employee';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationDialogComponent } from '../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component'; // import your dialog
import { EmployeeService } from '../../core/services/employee.service'; // Your service for API calls

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService
  ) {}

  trackById(index: number, employee: Employee): number {
    return employee.id; // Returns the unique identifier for each employee
  }

  openDeleteDialog(employeeId: number, employeeFirstName: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { employeeId, employeeFirstName },
    });

    // Listen for the employeeDeleted event and reload the employee list
    dialogRef.componentInstance.employeeDeleted.subscribe(() => {
      this.getEmployees(); // Reload the list of employees after successful deletion
    });
  }

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
}
