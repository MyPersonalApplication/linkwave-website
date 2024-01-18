import { Component } from '@angular/core';
import { Profile, UserInfo } from '../models/profile';
import { FriendRequest } from '../models/friend-request';
import { SwalService } from '../services/swal.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.scss'],
})
export class FriendRequestComponent {
  userProfile: Profile[] = [
    {
      id: '1',
      gender: true,
      dob: new Date(),
      country: 'Vietnam',
      address: 'Can Tho',
      aboutMe: 'I am a developer',
      phoneNumber: '0123456789',
      hobbies: ['Reading', 'Coding', 'Gaming'],
      avatarUrl: 'assets/avatar/my-avatar-3.jpg',
      coverUrl: 'https://picsum.photos/seed/picsum/200/300',
    },
    {
      id: '2',
      gender: true,
      dob: new Date(),
      country: 'Vietnam',
      address: 'Can Tho',
      aboutMe: 'I am a developer',
      phoneNumber: '0123456789',
      hobbies: ['Reading', 'Coding', 'Gaming'],
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
      coverUrl: 'https://picsum.photos/seed/picsum/200/300',
    },
    {
      id: '3',
      gender: true,
      dob: new Date(),
      country: 'Vietnam',
      address: 'Can Tho',
      aboutMe: 'I am a developer',
      phoneNumber: '0123456789',
      hobbies: ['Reading', 'Coding', 'Gaming'],
      avatarUrl: 'assets/avatar/my-avatar.jpg',
      coverUrl: 'https://picsum.photos/seed/picsum/200/300',
    },
  ];

  userInfo: UserInfo[] = [
    {
      id: '1',
      email: 'quang@gmail.com',
      firstName: 'Quang',
      lastName: 'Nguyen',
      profile: this.userProfile[0],
    },
    {
      id: '2',
      email: 'trannq@gmail.com',
      firstName: 'Tran',
      lastName: 'Nguyen',
      profile: this.userProfile[1],
    },
    {
      id: '3',
      email: 'duongnt@gmail.com',
      firstName: 'Duong',
      lastName: 'Nguyen',
      profile: this.userProfile[2],
    },
  ];

  friendRequests: FriendRequest[] = [
    {
      id: '1',
      sender: this.userInfo[0],
      createdAt: new Date(),
    },
    {
      id: '2',
      sender: this.userInfo[1],
      createdAt: new Date(),
    },
    {
      id: '3',
      sender: this.userInfo[2],
      createdAt: new Date(),
    },
  ];

  constructor(private swalService: SwalService) {}

  confirmFriendRequest(id: string) {
    console.log(`Confirm friend request ${id}`);
  }

  removeFriendRequest(id: string) {
    this.swalService.confirmToHandle(
      'Are you sure you want to remove?',
      'warning',
      this.processRemove.bind(this, id)
    );
  }

  processRemove(id: string) {
    console.log(`Remove friend request ${id}`);
  }
}
