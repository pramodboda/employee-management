import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DeleteConfirmationDialogComponent } from './shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend-angular19';
  constructor(private dialog: MatDialog) {}

  // openDeleteDialog(employeeId: number) {
  //   const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
  //     data: { id: employeeId },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.deleteEmployee(employeeId);
  //     }
  //   });
  // }
}
