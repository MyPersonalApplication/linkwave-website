import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  faFacebook as faBrandFacebook,
  faGithub as faBrandGithub,
  faLinkedin as faBrandLinkedin,
  faInstagramSquare as faBrandInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { AboutMeComponent } from 'src/app/component/dialog/about-me/about-me.component';
import { ExperienceComponent } from 'src/app/component/dialog/experience/experience.component';
import { SkillComponent } from 'src/app/component/dialog/skill/skill.component';
import {
  Experience,
  ExperienceType,
  Skill,
  UserInfo,
} from 'src/app/models/profile';
import { UserService } from 'src/app/services/api/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';
import { passwordMatchingValidatior } from 'src/app/shared/utility/validator/password.validator';

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
  isCurrentUser = false;
  profileData: UserInfo | undefined;
  workExperiences: Experience[] = [];
  educationExperiences: Experience[] = [];
  changePasswordForm!: FormGroup;
  hideOldPassword: boolean = true;
  hidePassword: boolean = true;
  hideConfirm: boolean = true;
  isLoading: boolean = false;

  constructor(
    private showToast: ToastService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchingValidatior }
    );
    this.route.parent?.paramMap.subscribe((params) => {
      this.userId = params.get('id')!;
      this.loadProfileData(this.userId);
    });
  }

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword') as FormGroup;
  }

  get password() {
    return this.changePasswordForm.get('password') as FormGroup;
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword') as FormGroup;
  }

  loadProfileData(userId: string | null) {
    userId ? this.getProfile(userId) : this.getCurrentProfile();
  }

  getProfile(userId: string) {
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
  }

  getCurrentProfile() {
    this.userService.getCurrentProfile().subscribe({
      next: (response: UserInfo) => {
        this.isCurrentUser = true;
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
        this.authService.saveUserData(response);
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

  openDialogEditProfile() {
    const dialogRef = this.dialog.open(AboutMeComponent, {
      data: this.profileData,
    });

    dialogRef.afterClosed().subscribe((result: UserInfo) => {
      if (result) {
        this.userService.updateProfile(result).subscribe({
          next: (response: any) => {
            this.loadProfileData(this.userId);
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

  openDialogExperience(experiencenId: string, experienceType: ExperienceType) {
    let experience: Experience;

    if (experienceType === ExperienceType.WORK) {
      experience = this.workExperiences.find(
        (exp) => exp.id === experiencenId
      ) as Experience;
    } else {
      experience = this.educationExperiences.find(
        (exp) => exp.id === experiencenId
      ) as Experience;
    }

    const dialogRef = this.dialog.open(ExperienceComponent, {
      data: {
        experience,
        experienceType,
      },
    });

    dialogRef.afterClosed().subscribe((result: Experience) => {
      if (!result) {
        return;
      }

      if (typeof result == 'object') {
        if (result.id) {
          this.userService.updateExperience(result).subscribe({
            next: () => {
              if (result.experienceType === ExperienceType.WORK) {
                this.workExperiences = this.workExperiences.map((exp) =>
                  exp.id === result.id ? result : exp
                );
                this.showToast.showSuccessMessage(
                  'Success',
                  'Update work experience successfully'
                );
              } else {
                this.educationExperiences = this.educationExperiences.map(
                  (exp) => (exp.id === result.id ? result : exp)
                );
                this.showToast.showSuccessMessage(
                  'Success',
                  'Update education experience successfully'
                );
              }
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
          this.userService.addExperience(result).subscribe({
            next: (response: any) => {
              this.profileData?.experiences?.push(response);
              if (result.experienceType === ExperienceType.WORK) {
                this.workExperiences.push(response);
                this.showToast.showSuccessMessage(
                  'Success',
                  'Add work experience successfully'
                );
              } else {
                this.educationExperiences.push(response);
                this.showToast.showSuccessMessage(
                  'Success',
                  'Add education experience successfully'
                );
              }
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
      } else {
        const experience = this.profileData?.experiences?.find(
          (exp) => exp.id === result
        );
        this.userService.deleteExperience(result).subscribe({
          next: () => {
            if (experience?.experienceType === ExperienceType.WORK) {
              this.workExperiences = this.workExperiences.filter(
                (exp) => exp.id !== result
              );
              this.showToast.showSuccessMessage(
                'Success',
                'Delete work experience successfully'
              );
            } else {
              this.educationExperiences = this.educationExperiences.filter(
                (exp) => exp.id !== result
              );
              this.showToast.showSuccessMessage(
                'Success',
                'Delete education experience successfully'
              );
            }
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

  openDialogSkill(skillId: string) {
    const skill = this.profileData?.skills?.find((s) => s.id === skillId);

    const dialogRef = this.dialog.open(SkillComponent, {
      data: skill,
    });

    dialogRef.afterClosed().subscribe((result: Skill) => {
      if (!result) {
        return;
      }

      if (typeof result == 'object') {
        if (result.id) {
          this.userService.updateSkill(result).subscribe({
            next: () => {
              this.profileData!.skills = this.profileData!.skills?.map((s) =>
                s.id === result.id ? result : s
              );
              this.showToast.showSuccessMessage(
                'Success',
                'Update skill successfully'
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
        } else {
          this.userService.addSkill(result).subscribe({
            next: (response: any) => {
              this.profileData!.skills?.push(response);
              this.showToast.showSuccessMessage(
                'Success',
                'Add skill successfully'
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
      } else {
        this.userService.deleteSkill(result).subscribe({
          next: () => {
            this.profileData!.skills = this.profileData!.skills?.filter(
              (s) => s.id !== result
            );
            this.showToast.showSuccessMessage(
              'Success',
              'Delete skill successfully'
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

  toggleOldPasswordVisibility(): void {
    this.hideOldPassword = !this.hideOldPassword;
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmVisibility(): void {
    this.hideConfirm = !this.hideConfirm;
  }

  submit(): void {
    if (this.changePasswordForm.invalid) {
      this.showToast.showWarningMessage('Warning', 'Please fill in all fields');
      return;
    }

    const requestData = {
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.password,
    };

    this.isLoading = true;
    this.userService.changePassword(requestData).subscribe({
      next: () => {
        this.isLoading = false;
        this.showToast.showSuccessMessage(
          'Success',
          'Change password successfully'
        );
        this.changePasswordForm.reset();
      },
      error: (error) => {
        this.isLoading = false;
        this.showToast.showErrorMessage(
          'Error',
          error.error?.message || 'Change password failed. Please try again'
        );
      },
    });
  }
}
