import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './content/components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './content/components/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './content/components/update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './content/components/employee-details/employee-details.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'update-employee/:id', component: UpdateEmployeeComponent },
  { path: 'employee-details/:id', component: EmployeeDetailsComponent },
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
