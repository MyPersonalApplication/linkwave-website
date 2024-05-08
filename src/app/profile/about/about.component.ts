import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
import { ToastService } from 'src/app/services/toast.service';
import { passwordMatchingValidatior } from 'src/app/shared/utility/validator/password.validator';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  @Input() profileData: UserInfo | undefined;
  @Input() isCurrentUser!: boolean;
  @Output() reloadUser: EventEmitter<void> = new EventEmitter<void>();

  faBrandFacebook = faBrandFacebook;
  faBrandGithub = faBrandGithub;
  faBrandLinkedin = faBrandLinkedin;
  faBrandInstagram = faBrandInstagram;

  ExperienceType = ExperienceType;
  contentLoading = false;
  workExperiences: Experience[] = [];
  educationExperiences: Experience[] = [];
  changePasswordForm!: FormGroup;
  hideOldPassword: boolean = true;
  hidePassword: boolean = true;
  hideConfirm: boolean = true;
  isLoading: boolean = false;

  constructor(
    private showToast: ToastService,
    private userService: UserService,
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
    this.workExperiences =
      this.profileData?.experiences?.filter(
        (exp) => exp.experienceType === ExperienceType.WORK
      ) || [];
    this.educationExperiences =
      this.profileData?.experiences?.filter(
        (exp) => exp.experienceType === ExperienceType.EDUCATION
      ) || [];
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

  openDialogEditProfile() {
    const dialogRef = this.dialog.open(AboutMeComponent, {
      data: this.profileData,
    });

    dialogRef.afterClosed().subscribe((result: UserInfo) => {
      if (result) {
        this.userService.updateProfile(result).subscribe({
          next: (response: any) => {
            this.reloadUser.emit();
            this.showToast.showSuccessMessage(
              'Success',
              'Update profile successfully'
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
              this.reloadUser.emit();
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
              this.reloadUser.emit();
              if (result.experienceType === ExperienceType.WORK) {
                this.workExperiences.unshift(response);
                this.showToast.showSuccessMessage(
                  'Success',
                  'Add work experience successfully'
                );
              } else {
                this.educationExperiences.unshift(response);
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
            this.reloadUser.emit();
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
              this.reloadUser.emit();
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
              this.reloadUser.emit();
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
