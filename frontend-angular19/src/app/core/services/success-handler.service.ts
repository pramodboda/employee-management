import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class SuccessHandlerService {
  constructor(private notificationService: NotificationService) {}

  /**
   * Displays a success message.
   * @param message - The message to be displayed.
   */
  handleSuccess(message: string): void {
    this.notificationService.showSuccess(message);
  }
}
