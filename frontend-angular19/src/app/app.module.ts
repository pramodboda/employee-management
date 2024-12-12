import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
// import { EmployeeListComponent } from './content/components/employee-list/employee-list.component';
// import { CreateEmployeeComponent } from './content/components/create-employee/create-employee.component';
// import { UpdateEmployeeComponent } from './content/components/update-employee/update-employee.component';
// import { EmployeeDetailsComponent } from './content/components/employee-details/employee-details.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    AppComponent, // Import the standalone component
  ],
  providers: [],
})
export class AppModule {}

// Bootstrap the application
bootstrapApplication(AppComponent);
