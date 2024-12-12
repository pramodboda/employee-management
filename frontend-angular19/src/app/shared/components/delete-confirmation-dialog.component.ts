import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <h2 mat-dialog-title>Confirm Deletion</h2>
    <mat-dialog-content
      >Are you sure you want to delete this employee?</mat-dialog-content
    >
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="warn" (click)="onConfirm()">Confirm</button>
    </mat-dialog-actions>
  `,
})
export class DeleteConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancel() {
    this.data.dialogRef.close(false);
  }

  onConfirm() {
    this.data.dialogRef.close(true);
  }
}