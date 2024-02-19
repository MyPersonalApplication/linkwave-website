import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent {
  constructor(
    private swalService: SwalService,
    private authService: AuthService,
    public router: Router
  ) {}

  renderToProfile() {
    this.router.navigate(['/profile']);
  }

  handleLogout() {
    this.swalService.confirmToHandle(
      'Are you sure you want to logout?',
      'warning',
      this.authService.logout.bind(this.authService)
    );
  }
}
