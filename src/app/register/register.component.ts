import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { passwordMatchingValidatior } from '../shared/utility/validator/password.validator';
import { SwalService } from '../services/swal.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registrationForm!: FormGroup;

  hidePassword: boolean = true;
  hideConfirm: boolean = true;
  isLoading: boolean = false;
  isAgreeTerm: boolean = false;

  constructor(
    private showToast: ToastService,
    private swalService: SwalService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  get firstName() {
    return this.registrationForm.get('firstName') as FormControl;
  }

  get lastName() {
    return this.registrationForm.get('lastName') as FormControl;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get agreeTerm() {
    return this.registrationForm.get('agreeTerm') as FormControl;
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        agreeTerm: [false],
      },
      { validators: passwordMatchingValidatior }
    );
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmVisibility(): void {
    this.hideConfirm = !this.hideConfirm;
  }

  agreeTermChange(): void {
    this.isAgreeTerm = !this.isAgreeTerm;
  }

  submit(): void {
    if (this.registrationForm.invalid) {
      this.showToast.showWarningMessage('Warning', 'Please fill in all fields');
      return;
    }
    if (this.registrationForm.valid && !this.registrationForm.value.agreeTerm) {
      this.showToast.showWarningMessage(
        'Warning',
        'Please agree with our terms'
      );
      return;
    }
    const requestData = {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
    };

    this.isLoading = true;
    this.authService.register(requestData).subscribe({
      next: () => {
        this.isLoading = false;
        this.swalService.showMessage(
          'Success',
          'Register successfully. Please check your email to verify account',
          'success'
        );
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.showToast.showErrorMessage(
          'Error',
          'Register failed. Please try again'
        );
      },
    });
  }
}
