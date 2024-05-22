import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  getNotifications() {
    return this.http.get<any>('/api/notifications');
  }

  markAsRead(notificationId: string) {
    return this.http.post<any>(
      `/api/notifications/${notificationId}/mark-as-read`,
      {}
    );
  }

  markAllAsRead() {
    return this.http.post<any>('/api/notifications/mark-all-as-read', {});
  }

  deleteNotification(notificationId: string) {
    return this.http.delete<any>(`/api/notifications/${notificationId}`);
  }
}
