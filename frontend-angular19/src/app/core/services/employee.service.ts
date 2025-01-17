import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Employee } from '../models/Employee';
import { ErrorHandlerService } from './error-handler.service';
import { SuccessHandlerService } from './success-handler.service';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  // private baseUrl = 'http://localhost:8080/api/v1/employees';
  private baseUrl = environment.apiUrl; // Access the apiUrl from environment

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private successHandler: SuccessHandlerService
  ) {}

  getEmployeesList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}`).pipe(
      tap(() =>
        this.successHandler.handleSuccess('Fetched employees successfully!')
      ),
      catchError((error) => this.errorHandler.handleHttpError(error))
    );
  }

  createEmployee(employee: Employee): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, employee).pipe(
      tap((res: any) => {
        const createdEmp = res;
        this.successHandler.handleSuccess(
          `Employee ${createdEmp.employeeName} created successfully!`
        );
      }),
      catchError((error) => this.errorHandler.handleHttpError(error))
    );
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, employee).pipe(
      tap((res: Employee) => {
        const updatedEmp = res;
        console.log('updatedEmpupdatedEmp', updatedEmp);
        this.successHandler.handleSuccess(
          `Employee ${updatedEmp.firstName} details are updated successfully!`
        );
      }),
      catchError((error) => this.errorHandler.handleHttpError(error))
    );
  }

  deleteEmployee(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      tap(() =>
        this.successHandler.handleSuccess('Employee deleted successfully!')
      ),
      catchError((error) => this.errorHandler.handleHttpError(error))
    );
  }
}
