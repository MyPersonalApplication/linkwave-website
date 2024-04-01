import { Component } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  isMenuToggled: boolean = false;

  messageList = [
    {
      id: '1',
      name: 'John Doe',
      avatarUrl: 'assets/avatar/my-avatar-3.jpg',
      lastMessage: 'Hello, how are you?',
      lastMessageTime: new Date(),
      unreadCount: 3,
    },
    {
      id: '2',
      name: 'Jane Doe',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
      lastMessage: 'I am fine, thank you. And you?',
      lastMessageTime: new Date(),
      unreadCount: 0,
    },
    {
      id: '3',
      name: 'John Smith',
      avatarUrl: 'assets/avatar/my-avatar.jpg',
      lastMessage: 'I am fine, thank you. And you?',
      lastMessageTime: new Date(),
      unreadCount: 0,
    },
    {
      id: '4',
      name: 'Jane Smith',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
      lastMessage: 'I am fine, thank you. And you?',
      lastMessageTime: new Date(),
      unreadCount: 0,
    },
    {
      id: '5',
      name: 'John Doe',
      avatarUrl: 'assets/avatar/my-avatar-3.jpg',
      lastMessage: 'Hello, how are you?',
      lastMessageTime: new Date(),
      unreadCount: 3,
    },
    {
      id: '6',
      name: 'Jane Doe',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
      lastMessage: 'I am fine, thank you. And you?',
      lastMessageTime: new Date(),
      unreadCount: 0,
    },
    {
      id: '7',
      name: 'John Smith',
      avatarUrl: 'assets/avatar/my-avatar.jpg',
      lastMessage: 'I am fine, thank you. And you?',
      lastMessageTime: new Date(),
      unreadCount: 0,
    },
    {
      id: '8',
      name: 'Jane Smith',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
      lastMessage: 'I am fine, thank you. And you?',
      lastMessageTime: new Date(),
      unreadCount: 0,
    },
    {
      id: '9',
      name: 'John Doe',
      avatarUrl: 'assets/avatar/my-avatar-3.jpg',
      lastMessage: 'Hello, how are you?',
      lastMessageTime: new Date(),
      unreadCount: 3,
    },
    {
      id: '10',
      name: 'Jane Doe',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
      lastMessage: 'I am fine, thank you. And you?',
      lastMessageTime: new Date(),
      unreadCount: 0,
    },
    {
      id: '11',
      name: 'John Smith',
      avatarUrl: 'assets/avatar/my-avatar.jpg',
      lastMessage: 'I am fine, thank you. And you?',
      lastMessageTime: new Date(),
      unreadCount: 0,
    },
    {
      id: '12',
      name: 'Jane Smith',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
      lastMessage: 'I am fine, thank you. And you?',
      lastMessageTime: new Date(),
      unreadCount: 0,
    },
    {
      id: '13',
      name: 'John Doe',
      avatarUrl: 'assets/avatar/my-avatar-3.jpg',
      lastMessage: 'Hello, how are you?',
      lastMessageTime: new Date(),
      unreadCount: 3,
    },
    {
      id: '14',
      name: 'Jane Doe',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
      lastMessage: 'I am fine, thank you. And you?',
      lastMessageTime: new Date(),
      unreadCount: 0,
    },
    {
      id: '15',
      name: 'John Smith',
      avatarUrl: 'assets/avatar/my-avatar.jpg',
      lastMessage: 'I am fine, thank you. And you?',
      lastMessageTime: new Date(),
      unreadCount: 0,
    },
    {
      id: '16',
      name: 'Jane Smith',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
      lastMessage: 'I am fine, thank you. And you?',
      lastMessageTime: new Date(),
      unreadCount: 0,
    },
  ];

  toggleMenu() {
    this.isMenuToggled = !this.isMenuToggled;
  }
}
