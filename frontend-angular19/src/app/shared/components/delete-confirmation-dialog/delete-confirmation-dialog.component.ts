import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-delete-confirmation-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmationDialogComponent {
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
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
      },
    });
  }
}
