import { Component, OnInit } from '@angular/core';
import { FriendRecommend } from 'src/app/models/friend-request';
import { UserInfo } from 'src/app/models/profile';
import { FriendRequestService } from 'src/app/services/api/friend-request.service';
import { AuthService } from 'src/app/services/auth.service';
import { SwalService } from 'src/app/services/swal.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss'],
})
export class RecommendComponent implements OnInit {
  isLoadingRecommend = true;
  recommends: FriendRecommend[] = [];

  constructor(
    private swalService: SwalService,
    private friendRequestService: FriendRequestService,
    private showToast: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRecommendFriendData();
    console.log(this.getCurrentUserId());
  }

  loadRecommendFriendData() {
    this.friendRequestService.getRecommendFriends().subscribe({
      next: (response: FriendRecommend[]) => {
        this.isLoadingRecommend = false;
        this.recommends = response;
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

  getCurrentUserId() {
    const userData = this.authService.getUserData() as UserInfo;
    return userData.id;
  }

  addFriend(userId: string) {
    this.friendRequestService.sendFriendRequest(userId).subscribe({
      next: (response) => {
        this.showToast.showSuccessMessasge(
          'Success',
          response.message || 'Friend request sent'
        );
        this.loadRecommendFriendData();
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

  confirmFriendRequest(id: string) {
    this.friendRequestService.acceptFriendRequest(id).subscribe({
      next: (response) => {
        this.showToast.showSuccessMessasge(
          'Success',
          response.message || 'Friend request accepted'
        );
        this.loadRecommendFriendData();
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

  removeFriendRequest(id: string) {
    this.swalService.confirmToHandle(
      'Are you sure you want to remove?',
      'warning',
      this.processRemove.bind(this, id)
    );
  }

  processRemove(id: string) {
    this.friendRequestService.rejectFriendRequest(id).subscribe({
      next: (response) => {
        this.showToast.showSuccessMessasge(
          'Success',
          response.message || 'Friend request removed'
        );
        this.loadRecommendFriendData();
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

  recallRequest(requestId: string) {
    this.friendRequestService.deleteFriendRequest(requestId).subscribe({
      next: (response) => {
        this.showToast.showSuccessMessasge(
          'Success',
          response.message || 'Request recalled'
        );
        this.loadRecommendFriendData();
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
