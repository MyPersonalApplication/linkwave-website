import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { SwalService } from '../services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  isSaving = false;

  constructor(
    private showToast: ToastService,
    private swalService: SwalService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.showToast.showWarningMessage(
        'Warning',
        'Please enter a valid email address'
      );
      return;
    }

    this.isSaving = true;
    this.authService
      .resetPassword(this.forgotPasswordForm.value.email as string)
      .subscribe({
        next: (response) => {
          this.isSaving = false;
          this.swalService.showMessage(
            'Success',
            'Please check your email to reset your password',
            'success'
          );
          this.router.navigate(['/check-email'], {
            queryParams: { email: this.forgotPasswordForm.value.email },
          });
        },
        error: (error) => {
          this.isSaving = false;
          this.showToast.showErrorMessage('Error', error.error.message);
        },
      });
    // this.router.navigate(['/check-email'], {
    //   queryParams: { email: this.forgotPasswordForm.value.email },
    // });
  }
}
