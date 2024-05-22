import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/api/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { passwordMatchingValidatior } from 'src/app/shared/utility/validator/password.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  hideOldPassword: boolean = true;
  hidePassword: boolean = true;
  hideConfirm: boolean = true;
  isLoading: boolean = false;

  constructor(
    private showToast: ToastService,
    private userService: UserService,
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
