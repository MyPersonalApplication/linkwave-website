import { Component, OnInit } from '@angular/core';
import { FriendRequest } from 'src/app/models/friend-request';
import { FriendRequestService } from 'src/app/services/api/friend-request.service';
import { SwalService } from 'src/app/services/swal.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  isLoadingRequest = true;
  friendRequests: FriendRequest[] = [];

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
