import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/models/profile';
import { AuthService } from 'src/app/services/auth.service';
import { SwalService } from 'src/app/services/swal.service';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent implements OnInit {
  searchQuery: string = '';
  userData!: UserInfo;

  constructor(
    private swalService: SwalService,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.userData = this.authService.getUserData() as UserInfo;
  }

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

  onSearch(): void {
    if (this.searchQuery) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery },
      });
    }
  }
}
