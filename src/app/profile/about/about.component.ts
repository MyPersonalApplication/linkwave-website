import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  faFacebook as faBrandFacebook,
  faGithub as faBrandGithub,
  faLinkedin as faBrandLinkedin,
  faInstagramSquare as faBrandInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { AboutMeComponent } from 'src/app/component/dialog/about-me/about-me.component';
import { Experience, ExperienceType, UserInfo } from 'src/app/models/profile';
import { UserService } from 'src/app/services/api/user/user.service';
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
  contentLoaded = false;
  profileData: UserInfo | undefined;
  workExperiences: Experience[] = [];
  educationExperiences: Experience[] = [];

  constructor(
    private showToast: ToastService,
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog
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
          this.contentLoaded = true;
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
          this.contentLoaded = true;
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

  openDialog() {
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
