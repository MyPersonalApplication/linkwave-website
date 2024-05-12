import { Component, Input, OnInit } from '@angular/core';
import {
  faComments as faRegularComments,
  faHeart as faRegularHeart,
  faShareFromSquare as faRegularShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/app/models/post';
import * as AOS from 'aos';
import { AuthService } from 'src/app/services/auth.service';
import { UserInfo } from 'src/app/models/profile';
import { PostService } from 'src/app/services/api/post.service';
import { ToastService } from 'src/app/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { PostLikeComponent } from '../../dialog/post-like/post-like.component';
import { PostCommentComponent } from '../../dialog/post-comment/post-comment.component';

@Component({
  selector: 'app-card-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class CardPostComponent implements OnInit {
  faRegularHeart = faRegularHeart;
  faSolidHeart = faSolidHeart;
  faRegularComments = faRegularComments;
  faRegularShareFromSquare = faRegularShareFromSquare;

  @Input() postList!: Post[];

  constructor(
    private showToast: ToastService,
    public dialog: MatDialog,
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
    });
  }

  isLikedPost(postId: string) {
    const post = this.postList.find((post) => {
      return post.id === postId;
    });
    const currentUser = this.authService.getUserData() as UserInfo;

    const isLiked = post?.lstLikes.find((like) => {
      return like.user.id === currentUser.id;
    });

    return isLiked ? true : false;
  }

  likePost(postId: string) {
    const post = this.postList.find((post) => {
      return post.id === postId;
    }) as Post;
    const currentUser = this.authService.getUserData() as UserInfo;

    if (this.isLikedPost(post.id)) {
      // Unlike post
      const postLike = post.lstLikes.find((like) => {
        return like.user.id === currentUser.id;
      }) as any;

      this.postService.unlikePost(postLike.id).subscribe({
        next: (response) => {
          post.lstLikes = post.lstLikes.filter((like) => {
            return like.id !== response;
          });
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
      // Like post
      this.postService.likePost(post.id).subscribe({
        next: (response) => {
          post.lstLikes.unshift(response);
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
  }

  openDialogPostLike(postId: string) {
    const dialogRef = this.dialog.open(PostLikeComponent, {
      data: postId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`Dialog result: ${result}`);
      }
    });
  }

  openDialogPostComment(postId: string) {
    const dialogRef = this.dialog.open(PostCommentComponent, {
      data: postId,
      width: '100%',
      height: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`Dialog result: ${result}`);
      }
    });
  }
}
