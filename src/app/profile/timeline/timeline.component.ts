import { Component } from '@angular/core';
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

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  faSolidBriefcase = faSolidBriefcase;
  faSolidHouse = faSolidHouse;
  faSolidLocationDot = faSolidLocationDot;
  faSolidHeartPulse = faSolidHeartPulse;

  userProfile: Profile[] = [
    {
      id: '1',
      gender: true,
      dob: new Date(),
      country: 'Vietnam',
      address: 'Can Tho',
      aboutMe: 'I am a developer',
      phoneNumber: '0123456789',
      hobbies: ['Reading', 'Coding', 'Gaming'],
      avatarUrl: 'assets/avatar/my-avatar-3.jpg',
      coverUrl: 'https://picsum.photos/seed/picsum/200/300',
    },
    {
      id: '2',
      gender: true,
      dob: new Date(),
      country: 'Vietnam',
      address: 'Can Tho',
      aboutMe: 'I am a developer',
      phoneNumber: '0123456789',
      hobbies: ['Reading', 'Coding', 'Gaming'],
      avatarUrl: 'assets/avatar/my-avatar-4.jpg',
      coverUrl: 'https://picsum.photos/seed/picsum/200/300',
    },
    {
      id: '3',
      gender: true,
      dob: new Date(),
      country: 'Vietnam',
      address: 'Can Tho',
      aboutMe: 'I am a developer',
      phoneNumber: '0123456789',
      hobbies: ['Reading', 'Coding', 'Gaming'],
      avatarUrl: 'assets/avatar/my-avatar.jpg',
      coverUrl: 'https://picsum.photos/seed/picsum/200/300',
    },
  ];

  userInfo: UserInfo[] = [
    {
      id: '1',
      email: 'quang@gmail.com',
      firstName: 'Quang',
      lastName: 'Nguyen',
      profile: this.userProfile[0],
    },
    {
      id: '2',
      email: 'trannq@gmail.com',
      firstName: 'Tran',
      lastName: 'Nguyen',
      profile: this.userProfile[1],
    },
    {
      id: '3',
      email: 'duongnt@gmail.com',
      firstName: 'Duong',
      lastName: 'Nguyen',
      profile: this.userProfile[2],
    },
  ];

  postList: PostList[] = [
    {
      id: '1',
      content:
        "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
      isLiked: false,
      likes: 201,
      comments: 41,
      shares: 7,
      createdAt: new Date(),
      user: this.userInfo[0],
      media: [
        {
          id: '1',
          url: 'assets/images/post/post-1.jpg',
          caption: 'Post 1',
          isVideo: false,
        },
      ],
    },
    {
      id: '2',
      content:
        'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for',
      isLiked: true,
      likes: 206,
      comments: 41,
      shares: 7,
      createdAt: new Date(),
      user: this.userInfo[1],
      media: [
        {
          id: '1',
          url: 'assets/images/post/post-1.jpg',
          caption: 'Post 1',
          isVideo: false,
        },
        {
          id: '2',
          url: 'assets/images/post/post-2.jpg',
          caption: 'Post 2',
          isVideo: false,
        },
      ],
    },
    {
      id: '3',
      content:
        "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
      isLiked: false,
      likes: 112,
      comments: 36,
      shares: 8,
      createdAt: new Date(),
      user: this.userInfo[2],
      media: [
        {
          id: '2',
          url: 'assets/video/classic-watches-datejust-cover-autoplay.mp4',
          caption: 'Video 1',
          isVideo: true,
        },
      ],
    },
    {
      id: '4',
      content:
        "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
      isLiked: false,
      likes: 70,
      comments: 28,
      shares: 12,
      createdAt: new Date(),
      user: this.userInfo[0],
      media: [
        {
          id: '3',
          url: 'assets/images/post/post-2.jpg',
          caption: 'Post 2',
          isVideo: false,
        },
        {
          id: '4',
          url: 'assets/images/post/post-3.jpg',
          caption: 'Post 3',
          isVideo: false,
        },
        {
          id: '5',
          url: 'assets/images/post/post-4.jpg',
          caption: 'Post 4',
          isVideo: false,
        },
        {
          id: '6',
          url: 'assets/images/post/post-5.jpg',
          caption: 'Post 5',
          isVideo: false,
        },
      ],
    },
    {
      id: '5',
      content:
        'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for Many desktop publishing duskam azer.',
      isLiked: true,
      likes: 250,
      comments: 80,
      shares: 10,
      createdAt: new Date(),
      user: this.userInfo[1],
      media: [],
    },
    {
      id: '6',
      content:
        'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for Many desktop publishing duskam azer.',
      isLiked: false,
      likes: 160,
      comments: 42,
      shares: 5,
      createdAt: new Date(),
      user: this.userInfo[2],
      media: [
        {
          id: '7',
          url: 'assets/video/introduction.mp4',
          caption: 'Video 2',
          isVideo: true,
        },
        {
          id: '8',
          url: 'assets/video/classic-watches-datejust-cover-autoplay.mp4',
          caption: 'Video 3',
          isVideo: true,
        },
      ],
    },
    {
      id: '7',
      content:
        'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for Many desktop publishing duskam azer.',
      isLiked: false,
      likes: 30,
      comments: 65,
      shares: 4,
      createdAt: new Date(),
      user: this.userInfo[0],
      media: [
        {
          id: '9',
          url: 'assets/images/post/post-1.jpg',
          caption: 'Post 6',
          isVideo: false,
        },
        {
          id: '10',
          url: 'assets/images/post/post-7.jpg',
          caption: 'Post 7',
          isVideo: false,
        },
        {
          id: '11',
          url: 'assets/images/post/post-7.jpg',
          caption: 'Post 8',
          isVideo: false,
        },
      ],
    },
    {
      id: '8',
      content:
        'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for Many desktop publishing duskam azer.',
      isLiked: false,
      likes: 320,
      comments: 41,
      shares: 7,
      createdAt: new Date(),
      user: this.userInfo[1],
      media: [
        {
          id: '12',
          url: 'assets/video/introduction.mp4',
          caption: 'Video 4',
          isVideo: true,
        },
        {
          id: '13',
          url: 'assets/video/classic-watches-datejust-cover-autoplay.mp4',
          caption: 'Video 5',
          isVideo: true,
        },
        {
          id: '14',
          url: 'assets/video/introduction.mp4',
          caption: 'Video 6',
          isVideo: true,
        },
      ],
    },
    {
      id: '9',
      content:
        'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for Many desktop publishing duskam azer.',
      isLiked: false,
      likes: 120,
      comments: 41,
      shares: 7,
      createdAt: new Date(),
      user: this.userInfo[2],
      media: [
        {
          id: '15',
          url: 'assets/video/introduction.mp4',
          caption: 'Video 7',
          isVideo: true,
        },
        {
          id: '16',
          url: 'assets/video/classic-watches-datejust-cover-autoplay.mp4',
          caption: 'Video 8',
          isVideo: true,
        },
        {
          id: '17',
          url: 'assets/video/introduction.mp4',
          caption: 'Video 9',
          isVideo: true,
        },
        {
          id: '18',
          url: 'assets/video/classic-watches-datejust-cover-autoplay.mp4',
          caption: 'Video 10',
          isVideo: true,
        },
      ],
    },
  ];

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

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(PostComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
