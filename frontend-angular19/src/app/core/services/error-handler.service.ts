import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private notificationService: NotificationService) {}

  handleHttpError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else if (error.status === 0) {
      const errorDetail = navigator.onLine
        ? 'The server is reachable, but something went wrong with the request.'
        : 'You appear to be offline. Please check your internet connection.';
      errorMessage = `Unable to connect to the server. ${errorDetail}`;
    } else {
      errorMessage = `Backend error: ${error.status} - ${error.message}`;
    }

    this.notificationService.showError(errorMessage);
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
