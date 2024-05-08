import { Component } from '@angular/core';
import { UserInfo } from 'src/app/models/profile';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-card-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class CardProfileComponent {
  userData!: UserInfo;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userData = this.authService.getUserData() as UserInfo;
  }
}
