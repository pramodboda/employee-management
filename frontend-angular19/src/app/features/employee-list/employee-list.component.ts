import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { MatSelectModule } from '@angular/material/select';

interface GenderOptions {
  value: string;
  viewValue: string;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-employee-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginator,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

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

  genderOptions: GenderOptions[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'other', viewValue: 'Other' },
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

  // Enable edit mode for a given employee
  editEmployee(employee: any) {
    employee.editMode = true;
  }

  // Save the updated employee details
  saveEmployee(employee: any) {
    employee.editMode = false;
    // Call API or update your employee service to save the updated data
    console.log('Updated Employee:', employee);
  }

  // This function handles opening the delete confirmation dialog
  openDeleteDialog(employeeId: number, employeeFirstName: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: { employeeId, employeeFirstName },
    });

    dialogRef.componentInstance.employeeDeleted.subscribe(() => {
      // Filter out the deleted employee
      this.employees = this.employees.filter((emp) => emp.id !== employeeId);

      // Update the dataSource based on current paginator state
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      const endIndex = startIndex + this.paginator.pageSize;

      // Adjust the data source to show the updated rows for the current page
      this.dataSource.data = this.employees.slice(startIndex, endIndex);

      // Check if the current page is now empty after deletion
      if (this.dataSource.data.length === 0 && this.paginator.pageIndex > 0) {
        this.paginator.previousPage(); // Move to the previous page if current page is empty
      }
    });
  }

  updateEmployee(id: number) {
    console.log('Update employee', id);
  }
}
