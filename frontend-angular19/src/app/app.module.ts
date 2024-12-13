import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MatDialogConfig,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; // import this for button styling
import { MatIconModule } from '@angular/material/icon'; // Optional, for icons

import { NotificationService } from './core/services/notification.service';
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    AppComponent, // Import the standalone component
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    NotificationService, // Register NotificationService,
  ],
})
export class AppModule {}

// Bootstrap the application
bootstrapApplication(AppComponent);
