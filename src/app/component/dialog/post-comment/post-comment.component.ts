import { Component, Inject, OnInit } from '@angular/core';
import {
  faComments as faRegularComments,
  faHeart as faRegularHeart,
  faShareFromSquare as faRegularShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostComment, Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/api/post.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserInfo } from 'src/app/models/profile';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostCommentService } from 'src/app/services/api/post-comment.service';
import { StompService } from 'src/app/services/ws/stomp.service';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
})
export class PostCommentComponent implements OnInit {
  faRegularHeart = faRegularHeart;
  faSolidHeart = faSolidHeart;
  faRegularComments = faRegularComments;
  post!: Post;
  commentForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private showToast: ToastService,
    private authService: AuthService,
    private postService: PostService,
    private postCommentService: PostCommentService,
    private formBuilder: FormBuilder,
    private stompService: StompService
  ) {
    this.loadPostById(data);
  }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      content: [''],
    });
    this.stompService.connect().then(() => {
      this.stompService.initializeTopicSubscription(
        '/topic/post',
        (post: Post) => {
          if (post.id === this.post.id) {
            this.post = post;
            // Sort comments by created date
            this.post.lstComments = this.post.lstComments.sort((a, b) => {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            });
          }
        }
      );
    });
  }

  loadPostById(data: string) {
    this.postService.getPost(data).subscribe({
      next: (response) => {
        this.post = response;
        // Sort comments by created date
        this.post.lstComments = this.post.lstComments.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
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

  formatDistanceToNow(date: Date) {
    const formattedDate: string = formatDistanceToNow(date, {
      addSuffix: true,
    });

    return formattedDate;
  }

  submit(): void {
    if (this.commentForm.value.content === '') {
      return;
    }

    this.postCommentService
      .commentPost(this.post.id, this.commentForm.value.content, null)
      .subscribe({
        next: () => {
          this.commentForm.reset();
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
