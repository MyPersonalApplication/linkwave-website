import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  pages: any[] = [
    {
      name: 'Post',
      path: '/admin/post',
      icon: 'bi bi-postcard',
      isActive: false,
    },
    {
      name: 'User',
      path: '/admin/user',
      icon: 'bi bi-person',
      isActive: false,
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const path = window.location.pathname;
    this.pages.forEach((page) => {
      page.isActive = path.includes(page.path);
    });
  }

  redicrectLink(path: string): void {
    this.pages.forEach((page) => {
      page.isActive = path.includes(page.path);
    });
    this.router.navigate([path]);
  }
}
