import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  faBriefcase as faSolidBriefcase,
  faHouse as faSolidHouse,
  faLocationDot as faSolidLocationDot,
  faHeartPulse as faSolidHeartPulse,
} from '@fortawesome/free-solid-svg-icons';
import { PostComponent } from 'src/app/component/dialog/post/post.component';
import { Post, PostMedia } from 'src/app/models/post';
import { UserInfo } from 'src/app/models/profile';
import { PostService } from 'src/app/services/api/post.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  @Input() profileData: UserInfo | undefined;
  @Input() isCurrentUser!: boolean;

  faSolidBriefcase = faSolidBriefcase;
  faSolidHouse = faSolidHouse;
  faSolidLocationDot = faSolidLocationDot;
  faSolidHeartPulse = faSolidHeartPulse;
  postList: Post[] = [];

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

  constructor(
    public dialog: MatDialog,
    private showToast: ToastService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loadPosts(this.profileData!.id);
  }

  loadPosts(userId: string) {
    this.postService.getPostByUser(userId).subscribe({
      next: (response) => {
        this.postList = response;
      },
      error: (response) => {
        this.showToast.showErrorMessage(
          'Error',
          response.error?.message ||
            'Something went wrong. Please try again later'
        );
      },
    });
  }

  formatHobbies() {
    return this.profileData?.profile?.hobbies.join(', ');
  }

  hobbiesLength() {
    return this.profileData?.profile?.hobbies.length ?? 0;
  }

  getPositionWork() {
    const lstExperiences = this.profileData?.experiences;
    return lstExperiences?.find((exp) => !exp.endDate)?.positionOrDegree ?? '';
  }

  openDialog() {
    const dialogRef = this.dialog.open(PostComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        this.postService.createPost(result).subscribe({
          next: (postResponse: Post) => {
            const postId = postResponse.id;
            if (result.files.length > 0) {
              this.postService.createPostMedia(postId, result.files).subscribe({
                next: (response: PostMedia[]) => {
                  postResponse.lstMedia = response;
                  postResponse.lstLikes = [];
                  postResponse.lstComments = [];
                },
                error: (response) => {
                  this.showToast.showErrorMessage(
                    'Error',
                    response.error?.message ||
                      'Something went wrong. Please try again later'
                  );
                },
              });
            } else {
              postResponse.lstMedia = [];
              postResponse.lstLikes = [];
              postResponse.lstComments = [];
            }
            this.postList.unshift(postResponse);
          },
          error: (response) => {
            this.showToast.showErrorMessage(
              'Error',
              response.error?.message ||
                'Something went wrong. Please try again later'
            );
          },
        });
      }
    });
  }
}
