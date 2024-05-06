import { Component, Inject } from '@angular/core';
import {
  faComments as faRegularComments,
  faHeart as faRegularHeart,
  faShareFromSquare as faRegularShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostComment, PostList } from 'src/app/models/post';
import { PostService } from 'src/app/services/api/post.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserInfo } from 'src/app/models/profile';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
})
export class PostCommentComponent {
  faRegularHeart = faRegularHeart;
  faSolidHeart = faSolidHeart;
  faRegularComments = faRegularComments;
  post!: PostList;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private showToast: ToastService,
    private authService: AuthService,
    private postService: PostService
  ) {
    this.loadPost(data);
  }

  loadPost(data: string) {
    this.postService.getPost(data).subscribe({
      next: (response) => {
        this.post = response;
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

  isLikedPost() {
    const currentUser = this.authService.getUserData() as UserInfo;

    const isLiked = this.post.lstLikes.find((like) => {
      return like.user.id === currentUser.id;
    });

    return isLiked ? true : false;
  }

  likePost() {
    const currentUser = this.authService.getUserData() as UserInfo;

    if (this.isLikedPost()) {
      // Unlike post
      const postLike = this.post.lstLikes.find((like) => {
        return like.user.id === currentUser.id;
      }) as any;

      this.postService.unlikePost(postLike.id).subscribe({
        next: (response) => {
          this.post.lstLikes = this.post.lstLikes.filter((like) => {
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
      this.postService.likePost(this.post.id).subscribe({
        next: (response) => {
          this.post.lstLikes.unshift(response);
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
}
