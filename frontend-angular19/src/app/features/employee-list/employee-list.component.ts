import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '../../core/models/Employee';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationDialogComponent } from '../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component'; // import your dialog
import { EmployeeService } from '../../core/services/employee.service'; // Your service for API calls

import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-employee-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  errorMessage: string | null = null; // add a property to store error message
  employees: Employee[] = [];
  loading: boolean = false; // To indicate loading state
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>(
    []
  ); // DataSource for the table
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'emailId',
    'gender',
    'actions',
  ]; // Define columns to display in the table
  pageSize: number = 5; // Define page size for pagination

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService
  ) {}

  // TrackBy function for performance optimization
  trackById(index: number, employee: Employee): number {
    return employee.id; // Returns the unique identifier for each employee
  }

  // Pagination change event
  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource.data = this.employees.slice(startIndex, endIndex); // Update table data on page change
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

  getEmployees() {
    this.loading = true;
    this.employeeService.getEmployeesList().subscribe(
      (data) => {
        this.employees = data;
        this.dataSource.data = this.employees.slice(0, this.pageSize); // Assign the data to MatTableDataSource
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Error loading employees. Please try again.'; // Display error message
      }
    );
  }

  updateEmployee(id: number) {
    // Navigate to update employee component
    console.log('Update employee', id);
  }
}
