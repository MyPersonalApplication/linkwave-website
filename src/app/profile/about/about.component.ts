import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  faFacebook as faBrandFacebook,
  faGithub as faBrandGithub,
  faLinkedin as faBrandLinkedin,
  faInstagramSquare as faBrandInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { AboutMeComponent } from 'src/app/component/dialog/about-me/about-me.component';
import { AvatarComponent } from 'src/app/component/dialog/avatar/avatar.component';
import { CoverComponent } from 'src/app/component/dialog/cover/cover.component';
import {
  ChangeAvatar,
  Experience,
  ExperienceType,
  UserInfo,
} from 'src/app/models/profile';
import { UserService } from 'src/app/services/api/user.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  faBrandFacebook = faBrandFacebook;
  faBrandGithub = faBrandGithub;
  faBrandLinkedin = faBrandLinkedin;
  faBrandInstagram = faBrandInstagram;

  private userId: string = '';
  ExperienceType = ExperienceType;
  contentLoading = true;
  updateAvatarLoading = false;
  updateCoverLoading = false;
  profileData: UserInfo | undefined;
  workExperiences: Experience[] = [];
  educationExperiences: Experience[] = [];

  constructor(
    private showToast: ToastService,
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      this.userId = params.get('id')!;
      this.loadProfileData(this.userId);
    });
  }

  loadProfileData(userId: string | null) {
    if (userId) {
      this.userService.getProfile(userId).subscribe({
        next: (response: UserInfo) => {
          this.profileData = response;
          this.workExperiences =
            this.profileData?.experiences?.filter(
              (exp) => exp.experienceType === ExperienceType.WORK
            ) || [];
          this.educationExperiences =
            this.profileData?.experiences?.filter(
              (exp) => exp.experienceType === ExperienceType.EDUCATION
            ) || [];
          this.contentLoading = false;
        },
        error: (response) => {
          this.showToast.showErrorMessage(
            'Error',
            response.error?.message ||
              'Something went wrong. Please try again later'
          );
        },
      });
    } else {
      this.userService.getCurrentProfile().subscribe({
        next: (response: UserInfo) => {
          this.profileData = response;
          this.workExperiences =
            this.profileData?.experiences?.filter(
              (exp) => exp.experienceType === ExperienceType.WORK
            ) || [];
          this.educationExperiences =
            this.profileData?.experiences?.filter(
              (exp) => exp.experienceType === ExperienceType.EDUCATION
            ) || [];
          this.contentLoading = false;
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

  openDialogChangeAvatar() {
    const dialogRef = this.dialog.open(AvatarComponent, {
      data: this.profileData?.avatar,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.updateAvatarLoading = true;
        this.userService.updateAvatar(this.profileData!.id, result).subscribe({
          next: (response: any) => {
            this.loadProfileData(this.userId);
            this.updateAvatarLoading = false;
            this.showToast.showSuccessMessasge(
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
        this.updateCoverLoading = true;
        this.userService.updateCover(this.profileData!.id, result).subscribe({
          next: (response: any) => {
            this.loadProfileData(this.userId);
            this.updateCoverLoading = false;
            this.showToast.showSuccessMessasge(
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

  openDialogEditProfile() {
    const dialogRef = this.dialog.open(AboutMeComponent, {
      data: this.profileData,
    });

    dialogRef.afterClosed().subscribe((result: UserInfo) => {
      if (result) {
        this.userService.updateProfile(result).subscribe({
          next: (response: any) => {
            this.loadProfileData(this.userId);
            this.showToast.showSuccessMessasge(
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
}
