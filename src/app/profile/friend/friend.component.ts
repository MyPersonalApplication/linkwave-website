import { Component, OnInit } from '@angular/core';
import { FriendShip } from 'src/app/models/friendship';
import { ConversationService } from 'src/app/services/api/conversation.service';
import { FriendShipService } from 'src/app/services/api/friendship.service';
import { SwalService } from 'src/app/services/swal.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
})
export class FriendComponent implements OnInit {
  // Add 12 friends to the friends array
  friends: FriendShip[] = [];

  constructor(
    private showToast: ToastService,
    private friendShipService: FriendShipService,
    private conversationService: ConversationService,
    private swalService: SwalService
  ) {}

  ngOnInit(): void {
    this.getFriendList();
  }

  getFriendList() {
    this.friendShipService.getFriendList().subscribe({
      next: (response) => {
        this.friends = response;
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

  unFriend(friendId: string | undefined) {
    // Remove the friend from the friends array
    this.swalService.confirmToHandle(
      'Are you sure you want to unfriend this user?',
      'warning',
      this.handleUnFriend.bind(this, friendId)
    );
  }

  handleUnFriend(friendId: string | undefined) {
    if (!friendId) {
      return;
    }

    this.friendShipService.unFriend(friendId).subscribe({
      next: (response) => {
        this.friends = this.friends.filter(
          (friend) => friend.user.id !== friendId
        );
        this.showToast.showSuccessMessage('Success', response.message);
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

  handleMessage(friendId: string | undefined) {
    // Open the chat box with the selected friend
    console.log('Message', friendId);
    if (!friendId) {
      return;
    }
    this.conversationService.createConversation(friendId).subscribe({
      next: (response) => {
        console.log(response);
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
