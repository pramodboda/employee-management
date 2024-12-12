import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Employee } from '../models/Employee';
import { ErrorHandlerService } from './error-handler.service';
import { SuccessHandlerService } from './success-handler.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8080/api/v1/employees';

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
        const emp = res;
        this.successHandler.handleSuccess(
          `Employee ${emp.employeeName} created successfully!`
        );
      }),
      catchError((error) => this.errorHandler.handleHttpError(error))
    );
  }

  updateEmployee(id: number, employee: Employee): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, employee).pipe(
      tap((message: any) =>
        this.successHandler.handleSuccess(`Employee updated successfully!`)
      ),
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
