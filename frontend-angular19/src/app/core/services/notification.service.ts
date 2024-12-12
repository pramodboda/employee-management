// src/app/core/services/notification.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Using Angular Material Snackbar, or you can use a different UI library

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  // Function to display error messages using Snackbar
  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      // duration: 5000, // The snackbar will automatically close after 5 seconds
      panelClass: ['error-snackbar'], // Optional: custom CSS class for styling
    });
  }

  // Function to display success messages using Snackbar
  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'], // Optional: Custom styles
    });
  }
}
