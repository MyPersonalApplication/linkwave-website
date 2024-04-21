import { Component, OnInit } from '@angular/core';
import { FriendRecommend, FriendRequest } from '../models/friend-request';
import { SwalService } from '../services/swal.service';
import { FriendRequestService } from '../services/api/friend-request.service';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { UserInfo } from '../models/profile';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
})
export class UserFriendComponent implements OnInit {
  isLoadingRecommend = true;
  isLoadingRequest = true;

  recommends: FriendRecommend[] = [];
  friendRequests: FriendRequest[] = [];

  constructor(
    private swalService: SwalService,
    private friendRequestService: FriendRequestService,
    private showToast: ToastService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRecommendFriendData();
    this.loadFriendRequestData();
  }

  loadRecommendFriendData() {
    this.friendRequestService.getRecommendFriends(6).subscribe({
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

  loadFriendRequestData() {
    this.friendRequestService.getFriendRequests(6).subscribe({
      next: (response: FriendRequest[]) => {
        this.isLoadingRequest = false;
        this.friendRequests = response;
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
        this.showToast.showSuccessMessage(
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

  recallRequest(requestId: string) {
    this.friendRequestService.deleteFriendRequest(requestId).subscribe({
      next: (response) => {
        this.showToast.showSuccessMessage(
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

  confirmFriendRequest(id: string) {
    this.friendRequestService.acceptFriendRequest(id).subscribe({
      next: (response) => {
        this.showToast.showSuccessMessage(
          'Success',
          response.message || 'Friend request accepted'
        );
        this.loadFriendRequestData();
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
        this.showToast.showSuccessMessage(
          'Success',
          response.message || 'Friend request removed'
        );
        this.loadFriendRequestData();
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
