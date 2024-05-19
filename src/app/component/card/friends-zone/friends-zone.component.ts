import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faHeart as faRegularHeart,
  faMessage as faRegularMessage,
} from '@fortawesome/free-regular-svg-icons';
import { FriendShip } from 'src/app/models/friendship';
import { ConversationService } from 'src/app/services/api/conversation.service';
import { FriendShipService } from 'src/app/services/api/friendship.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-friends-zone',
  templateUrl: './friends-zone.component.html',
  styleUrls: ['./friends-zone.component.scss'],
})
export class FriendsZoneComponent implements OnInit {
  faRegularMessage = faRegularMessage;
  faRegularHeart = faRegularHeart;
  friends: FriendShip[] = [];
  isLoading: boolean = true;

  constructor(
    private showToast: ToastService,
    private friendShipService: FriendShipService,
    private conversationService: ConversationService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getFriendList();
  }

  changeLoadingState() {
    this.isLoading = !this.isLoading;
  }

  getFriendList() {
    this.friendShipService.getFriendList(10).subscribe({
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
      complete: () => {
        this.changeLoadingState();
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
