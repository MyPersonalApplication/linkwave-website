import { Component, OnInit } from '@angular/core';
import { FriendRequest } from '../models/friend-request';
import { SwalService } from '../services/swal.service';
import { FriendRequestService } from '../services/api/friend-request.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.scss'],
})
export class FriendRequestComponent implements OnInit {
  friendRequests: FriendRequest[] | undefined;

  constructor(
    private swalService: SwalService,
    private friendRequestService: FriendRequestService,
    private showToast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadFriendRequestData();
  }

  loadFriendRequestData() {
    this.friendRequestService.getFriendRequests().subscribe({
      next: (response: FriendRequest[]) => {
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

  confirmFriendRequest(id: string) {
    this.friendRequestService.acceptFriendRequest(id).subscribe({
      next: (response) => {
        this.showToast.showSuccessMessasge(
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
        this.showToast.showSuccessMessasge(
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
