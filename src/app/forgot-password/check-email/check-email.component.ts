import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, scan, takeWhile, timer } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.component.html',
  styleUrls: ['./check-email.component.scss'],
})
export class CheckEmailComponent implements OnInit {
  email: string = '';
  timer: Observable<number> | undefined;
  isWaiting = false;
  isLoading = false;

  constructor(
    private showToast: ToastService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const email = params['email'];
      console.log(
        '🚀 ~ CheckEmailComponent ~ this.route.queryParams.subscribe ~ email:',
        email
      );
      if (email) {
        this.email = email;
        this.startCoolDown();
      } else {
        this.showToast.showWarningMessage('Warning', 'Email not found');
      }
    });
  }

  resendEmail() {
    this.isLoading = true;
    this.isWaiting = false;
    this.authService.resetPassword(this.email).subscribe({
      next: () => {
        this.startCoolDown();
        this.showToast.showSuccessMessage('Success', 'Resend email successful');
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.showToast.showErrorMessage(
          'Error',
          'Resend email failed. Please try again'
        );
      },
    });
  }

  startCoolDown() {
    this.isWaiting = true;
    this.timer = timer(0, 1000).pipe(
      scan((acc) => --acc, 60), //waiting 60 second to resend email
      takeWhile((x) => x >= 0)
    );

    this.timer.subscribe({
      complete: () => {
        this.isWaiting = false;
        this.timer = undefined;
      },
    });
  }
}
