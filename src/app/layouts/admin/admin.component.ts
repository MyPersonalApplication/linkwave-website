import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/models/profile';
import { AuthService } from 'src/app/services/auth.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  isSidebarOpen = true;
  userData!: UserInfo;

  constructor(
    private authService: AuthService,
    private swalService: SwalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.getUserData() as UserInfo;

    if (window.innerWidth < 1200) {
      this.isSidebarOpen = false;
    }

    window.addEventListener('resize', this.handleResize.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  handleResize(): void {
    if (window.innerWidth < 1200) {
      this.isSidebarOpen = false;
    } else {
      this.isSidebarOpen = true;
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  handleLogout(): void {
    this.swalService.confirmToHandle(
      'Are you sure you want to logout?',
      'warning',
      () => {
        this.authService.logout();
        this.router.navigate(['/']);
      }
    );
  }
}
