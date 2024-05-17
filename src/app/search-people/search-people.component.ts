import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '../services/swal.service';
import { FriendRequestService } from '../services/api/friend-request.service';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { Pagination } from '../models/base';
import { FriendRecommend } from '../models/friend-request';
import { UserInfo } from '../models/profile';
import { ConversationService } from '../services/api/conversation.service';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.scss'],
})
export class SearchPeopleComponent implements OnInit {
  searchQuery: string = '';
  searchResult: FriendRecommend[] = [];
  pagination: Pagination = {
    pageSize: 10,
    page: 0,
    totalRecords: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private swalService: SwalService,
    private friendRequestService: FriendRequestService,
    private conversationService: ConversationService,
    private showToast: ToastService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'];
      this.loadRecommendFriendData(this.searchQuery);
    });
  }

  loadRecommendFriendData(searchQuery: string) {
    this.friendRequestService
      .searchUser(searchQuery, this.pagination.page, this.pagination.pageSize)
      .subscribe({
        next: (response) => {
          this.searchResult = response.contents;
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
        this.loadRecommendFriendData(this.searchQuery);
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
        this.loadRecommendFriendData(this.searchQuery);
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
        this.loadRecommendFriendData(this.searchQuery);
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
        this.loadRecommendFriendData(this.searchQuery);
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
