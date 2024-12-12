import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '../../core/models/Employee';
import { DeleteConfirmationDialogComponent } from '../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component'; // import your dialog
import { EmployeeService } from '../../core/services/employee.service'; // Your service for API calls

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService
  ) {}

  openDeleteDialog(employeeId: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { employeeId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteEmployee(employeeId);
      }
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

  deleteEmployee(id: number) {
    // Call service to delete employee
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        // Handle success - maybe reload the employee list or update UI
      },
      error: (err) => {
        // Handle error
      },
    });
  }
}
