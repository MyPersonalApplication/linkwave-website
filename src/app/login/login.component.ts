import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword: boolean = true;
  isLoading: boolean = false;

  constructor(
    private showToast: ToastService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  get email() {
    return this.loginForm.get('email') as FormGroup;
  }

  get password() {
    return this.loginForm.get('password') as FormGroup;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  submit(): void {
    if (this.loginForm.invalid) {
      this.showToast.showWarningMessage(
        'Warning',
        'Please complete all fields'
      );
      return;
    }

    this.isLoading = true;
    this.authService
      .login(
        this.loginForm.value.email as string,
        this.loginForm.value.password as string
      )
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.authService.saveUser(response);
          this.router.navigate(['/']);
        },
        error: (response) => {
          this.isLoading = false;

          switch (response.status) {
            case 403:
              this.showToast.showWarningMessage(
                'Warning',
                response.error.message
              );
              // this.router.navigate(['/verify']);
              break;
            case 401:
              this.showToast.showWarningMessage(
                'Warning',
                response.error.message
              );
              break;
            default:
              this.showToast.showErrorMessage(
                'Error',
                'Login failed. Please try again'
              );
          }
        },
      });
  }
}
