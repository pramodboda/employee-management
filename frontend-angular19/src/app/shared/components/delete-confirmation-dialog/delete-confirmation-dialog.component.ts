import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-delete-confirmation-dialog',
  imports: [MatButtonModule, MatDialogModule, CommonModule],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmationDialogComponent {
  errorMessage: string | null = null; // add a property to store error message
  @Output() employeeDeleted = new EventEmitter<void>(); // Create the emitter

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    private employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: { employeeId: number }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
  onConfirm(): void {
    console.log(this.data.employeeId);
    this.employeeService.deleteEmployee(this.data.employeeId).subscribe({
      next: () => {
        this.dialogRef.close();
        this.employeeDeleted.emit(); // Emit the event when deletion is successful
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
        this.errorMessage =
          'There was an error deleting the employee. Please try again later.'; // Display error message
      },
    });
  }
}
