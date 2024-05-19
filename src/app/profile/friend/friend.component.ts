import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendShip } from 'src/app/models/friendship';
import { ConversationService } from 'src/app/services/api/conversation.service';
import { FriendShipService } from 'src/app/services/api/friendship.service';
import { MessageService } from 'src/app/services/api/message.service';
import { SwalService } from 'src/app/services/swal.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
})
export class FriendComponent implements OnInit {
  friends: FriendShip[] = [];

  constructor(
    private showToast: ToastService,
    private friendShipService: FriendShipService,
    private conversationService: ConversationService,
    private swalService: SwalService,
    public router: Router
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
    if (!friendId) {
      return;
    }
    this.conversationService.createConversation(friendId).subscribe({
      next: (response) => {
        this.router.navigate(['/message'], {
          queryParams: { id: response.id },
        });
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
