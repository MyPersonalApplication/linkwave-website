import { Component } from '@angular/core';
import { Notification, NotificationType } from '../models/notification';
import { Profile, UserInfo } from '../models/profile';
import { ToastService } from '../services/toast.service';
import { NotificationService } from '../services/api/notification.service';
import { StompService } from '../services/ws/stomp.service';
import { AuthService } from '../services/auth.service';
import { SwalService } from '../services/swal.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  notifications: Notification[] = [];

  constructor(
    private showToast: ToastService,
    private swalService: SwalService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private stompService: StompService
  ) {
    const currentUser = this.authService.getUserData() as UserInfo;
    this.stompService.connect().then(() => {
      this.stompService.initializeTopicSubscription(
        '/topic/notification',
        (notification: Notification) => {
          if (notification.receiverId === currentUser.id) {
            this.showToast.showInfoMessage(
              'Notification',
              'You have a new notification'
            );
            this.notifications.unshift(notification);
          }
        }
      );
    });
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (response) => {
        this.notifications = response;
      },
      error: (response) => {
        this.showToast.showErrorMessage(
          'Error',
          response.error?.message ||
            'Something went wrong. Please try again later'
        );
      },
    });
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead().subscribe({
      next: () => {
        this.showToast.showSuccessMessage(
          'Success',
          'Mark all notifications as read successfully'
        );
        this.notifications.forEach((n) => (n.isRead = true));
      },
      error: (response) => {
        this.showToast.showErrorMessage(
          'Error',
          response.error?.message ||
            'Something went wrong. Please try again later'
        );
      },
    });
  }

  removeNotification(id: string): void {
    this.swalService.confirmToHandle(
      'Are you sure you want to remove?',
      'warning',
      this.processRemove.bind(this, id)
    );
  }

  processRemove(id: string) {
    this.notificationService.deleteNotification(id).subscribe({
      next: () => {
        this.notifications = this.notifications.filter((n) => n.id !== id);
        this.showToast.showSuccessMessage(
          'Success',
          'Remove notification successfully'
        );
      },
      error: (response) => {
        this.showToast.showErrorMessage(
          'Error',
          response.error?.message ||
            'Something went wrong. Please try again later'
        );
      },
    });
  }

  changeReadStatus(id: string): void {
    this.notificationService.markAsRead(id).subscribe({
      next: () => {
        this.showToast.showSuccessMessage(
          'Success',
          'Mark notification as read successfully'
        );
        const notification = this.notifications.find((n) => n.id === id);
        if (notification) {
          notification.isRead = !notification.isRead;
        }
      },
      error: (response) => {
        this.showToast.showErrorMessage(
          'Error',
          response.error?.message ||
            'Something went wrong. Please try again later'
        );
      },
    });
  }
}
