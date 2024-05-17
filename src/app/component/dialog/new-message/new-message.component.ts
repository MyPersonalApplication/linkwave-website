import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { FriendShip } from 'src/app/models/friendship';
import { FriendShipService } from 'src/app/services/api/friendship.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
})
export class NewMessageComponent {
  searchControl = new FormControl();
  users: FriendShip[] = [];
  searchUser: FriendShip[] = [];

  constructor(
    public dialogRef: MatDialogRef<NewMessageComponent>,
    private showToast: ToastService,
    private friendShipService: FriendShipService,
    public router: Router
  ) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500) // wait for 500ms after the last event before emitting last event
      )
      .subscribe((value) => {
        this.onInputChange(value);
      });
    this.getFriendList();
  }

  getFriendList() {
    this.friendShipService.getFriendList().subscribe({
      next: (response) => {
        this.users = response;
        this.searchUser = response;
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

  onInputChange(value: string): void {
    if (!value) {
      this.searchUser = this.users;
      return;
    }
    this.searchUser = this.users.filter((user) => {
      return (
        user.user.firstName.toLowerCase().includes(value.toLowerCase()) ||
        user.user.lastName.toLowerCase().includes(value.toLowerCase())
      );
    });
  }

  handleMessage(friendId: string | undefined) {
    if (!friendId) {
      return;
    }
    this.dialogRef.close(friendId);
  }
}
