import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  faBriefcase as faSolidBriefcase,
  faHouse as faSolidHouse,
  faLocationDot as faSolidLocationDot,
  faHeartPulse as faSolidHeartPulse,
} from '@fortawesome/free-solid-svg-icons';
import { PostComponent } from 'src/app/component/dialog/post/post.component';
import { PostList } from 'src/app/models/post';
import { Profile, UserInfo } from 'src/app/models/profile';
import mockUserProfile from 'src/app/mock/user-profile.json';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  userData!: UserInfo;
  faSolidBriefcase = faSolidBriefcase;
  faSolidHouse = faSolidHouse;
  faSolidLocationDot = faSolidLocationDot;
  faSolidHeartPulse = faSolidHeartPulse;
  postList: PostList[] = [];

  sweetsMemories = [
    {
      image: 'assets/avatar/my-avatar-4.jpg',
    },
    {
      image: 'assets/images/gallery/gallery-2.jpg',
    },
    {
      image: 'assets/images/gallery/gallery-3.jpg',
    },
    {
      image: 'assets/images/gallery/gallery-4.jpg',
    },
    {
      image: 'assets/images/gallery/gallery-5.jpg',
    },
    {
      image: 'assets/images/gallery/gallery-6.jpg',
    },
    {
      image: 'assets/images/gallery/gallery-7.jpg',
    },
    {
      image: 'assets/images/gallery/gallery-8.jpg',
    },
    {
      image: 'assets/images/gallery/gallery-9.jpg',
    },
  ];

  constructor(public dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {
    this.userData = this.userData = this.authService.getUserData() as UserInfo;
  }

  openDialog() {
    const dialogRef = this.dialog.open(PostComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
