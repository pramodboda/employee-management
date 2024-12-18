import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Employee } from '../../core/models/Employee';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationDialogComponent } from '../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EmployeeService } from '../../core/services/employee.service';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator'; // Import MatPaginator
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-employee-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginator,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator; // Reference to paginator

  errorMessage: string | null = null;
  employees: Employee[] = [];
  loading: boolean = false;
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>(
    []
  );
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'emailId',
    'gender',
    'actions',
  ];
  pageSize: number = 10; // Default page size

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  // This function is called when the paginator page is changed
  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.dataSource.data = this.employees.slice(startIndex, endIndex);
  }

  getEmployees() {
    this.loading = true;
    this.employeeService.getEmployeesList().subscribe(
      (data) => {
        this.employees = data;
        this.dataSource.data = this.employees.slice(0, this.pageSize); // Set the initial data for the table
        this.loading = false;

        // Update the paginator after data is loaded
        if (this.paginator) {
          this.paginator.pageIndex = 0; // Reset to the first page
        }
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Error loading employees. Please try again.';
      }
    );
  }

  // This function handles opening the delete confirmation dialog
  openDeleteDialog(employeeId: number, employeeFirstName: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { employeeId, employeeFirstName },
    });

    dialogRef.componentInstance.employeeDeleted.subscribe(() => {
      this.getEmployees();
    });
  }

  updateEmployee(id: number) {
    console.log('Update employee', id);
  }
}
