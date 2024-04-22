import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/api/user.service';
import { UserInfo } from '../models/profile';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AvatarComponent } from '../component/dialog/avatar/avatar.component';
import { CoverComponent } from '../component/dialog/cover/cover.component';

interface Page {
  text: string;
  url: string;
  isActive: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  coverImage: string | undefined;
  profileData: UserInfo | undefined;
  isCurrentUser = false;

  pages: Page[] = [
    { text: 'Timeline', url: 'timeline', isActive: true },
    { text: 'About', url: 'about', isActive: false },
    { text: 'Friends', url: 'friends', isActive: false },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private userService: UserService,
    private showToast: ToastService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.setActivePage();
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      this.loadProfileData(userId);
    });
  }

  loadProfileData(userId: string | null) {
    userId ? this.getProfile(userId) : this.getCurrentProfile();
  }

  getProfile(userId: string) {
    this.userService.getProfile(userId).subscribe({
      next: (response: UserInfo) => {
        this.profileData = response;
        this.coverImage =
          response.cover?.imageUrl || 'assets/images/banner/profile-banner.jpg';
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

  getCurrentProfile() {
    this.userService.getCurrentProfile().subscribe({
      next: (response: UserInfo) => {
        this.isCurrentUser = true;
        this.profileData = response;
        this.authService.saveUserData(response);
        this.coverImage =
          response.cover?.imageUrl || 'assets/images/banner/profile-banner.jpg';
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

  openDialogChangeAvatar() {
    const dialogRef = this.dialog.open(AvatarComponent, {
      data: this.profileData?.avatar,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.userService.updateAvatar(this.profileData!.id, result).subscribe({
          next: (response: any) => {
            this.loadProfileData(this.profileData!.id);
            this.showToast.showSuccessMessage(
              'Success',
              response.message || 'Update successfully'
            );
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
    });
  }

  openDialogChangeCover() {
    const dialogRef = this.dialog.open(CoverComponent, {
      data: this.profileData?.cover,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.userService.updateCover(this.profileData!.id, result).subscribe({
          next: (response: any) => {
            this.loadProfileData(this.profileData!.id);
            this.showToast.showSuccessMessage(
              'Success',
              response.message || 'Update successfully'
            );
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
    });
  }

  setActivePage(): void {
    const page = this.activatedRoute.firstChild?.snapshot.url[0].path;
    this.pages.forEach((p) => (p.isActive = false));
    const selectedPage = this.pages.find((p) => p.url === page);
    if (selectedPage) {
      selectedPage.isActive = true;
    }
  }

  onClick(page: Page): void {
    this.pages.forEach((p) => (p.isActive = false));
    page.isActive = true;
  }
}
