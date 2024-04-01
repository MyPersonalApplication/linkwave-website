import { Component } from '@angular/core';
import { Notification } from '../models/notification';
import { Profile, UserInfo } from '../models/profile';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  userProfile: Profile = {
    gender: true,
    dateOfBirth: new Date(),
    country: 'Vietnam',
    address: 'Can Tho',
    aboutMe: 'I am a developer',
    phoneNumber: '0123456789',
    hobbies: ['Reading', 'Coding', 'Gaming'],
  };

  userInfo: UserInfo = {
    id: '1',
    email: 'quang@gmail.com',
    firstName: 'Quang',
    lastName: 'Nguyen',
    profile: this.userProfile,
  };

  notifications: Notification[] = [
    {
      id: '1',
      type: 'friend-request',
      message: 'You have a new friend request',
      isRead: true,
      createdAt: new Date(),
      sender: this.userInfo,
    },
    {
      id: '2',
      type: 'message',
      message: 'You have a new message',
      isRead: false,
      createdAt: new Date(),
      sender: this.userInfo,
    },
    {
      id: '3',
      type: 'friend-request',
      message: 'You have a new friend request',
      isRead: true,
      createdAt: new Date(),
      sender: this.userInfo,
    },
    {
      id: '4',
      type: 'message',
      message: 'You have a new message',
      isRead: false,
      createdAt: new Date(),
      sender: this.userInfo,
    },
    {
      id: '5',
      type: 'friend-request',
      message: 'You have a new friend request',
      isRead: true,
      createdAt: new Date(),
      sender: this.userInfo,
    },
    {
      id: '6',
      type: 'message',
      message: 'You have a new message',
      isRead: false,
      createdAt: new Date(),
      sender: this.userInfo,
    },
    {
      id: '7',
      type: 'friend-request',
      message: 'You have a new friend request',
      isRead: true,
      createdAt: new Date(),
      sender: this.userInfo,
    },
  ];

  constructor(private showToast: ToastService) {}

  markAllAsRead(): void {
    this.notifications.forEach((n) => (n.isRead = true));
  }

  removeNotification(id: string): void {
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.showToast.showSuccessMessasge(
      'Success',
      'Remove notification successfully'
    );
  }

  changeReadStatus(id: string): void {
    const notification = this.notifications.find((n) => n.id === id);
    if (notification) {
      notification.isRead = !notification.isRead;
    }
  }
}
