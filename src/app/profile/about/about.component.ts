import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faFacebook as faBrandFacebook,
  faGithub as faBrandGithub,
  faLinkedin as faBrandLinkedin,
  faInstagramSquare as faBrandInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { UserInfo } from 'src/app/models/profile';
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
  contentLoaded = false;
  profileData: UserInfo | undefined;

  constructor(
    private showToast: ToastService,
    private route: ActivatedRoute,
    private userService: UserService
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
        next: (response) => {
          this.profileData = response as UserInfo;
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
        next: (response) => {
          this.profileData = response as UserInfo;
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
}
