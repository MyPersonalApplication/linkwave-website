import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalService } from '../services/swal.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private swalService: SwalService,
    private authService: AuthService,
    private router: Router
  ) {}

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
      this.swalService.showMessage(
        'Warning',
        'Please complete required fields',
        'warning'
      );
      return;
    }

    this.authService
      .login(
        this.loginForm.value.email as string,
        this.loginForm.value.password as string
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.authService.saveUser(response);
          this.router.navigate(['/']);
        },
        error: (response) => {
          console.log(response);
          this.swalService.showMessage(
            'Error',
            'Invalid email or password',
            'error'
          );
        },
      });
  }
}
