import { Component } from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
})
export class FriendComponent {
  // Add 12 friends to the friends array
  friends = [
    {
      id: '1',
      name: 'John Doe',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
    },
    {
      id: '2',
      name: 'Jane Doe',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
    },
    {
      id: '3',
      name: 'John Smith',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
    },
    {
      id: '4',
      name: 'Jane Smith',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
    },
    {
      id: '5',
      name: 'John Johnson',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
    },
    {
      id: '6',
      name: 'Jane Johnson',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
    },
    {
      id: '7',
      name: 'John Brown',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
    },
    {
      id: '8',
      name: 'Jane Brown',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
    },
    {
      id: '9',
      name: 'John Davis',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
    },
    {
      id: '10',
      name: 'Jane Davis',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
    },
    {
      id: '11',
      name: 'John Miller',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
    },
    {
      id: '12',
      name: 'Jane Miller',
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
    },
  ];
}
