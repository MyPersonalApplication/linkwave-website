import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  faComments as faRegularComments,
  faHeart as faRegularHeart,
  faShareFromSquare as faRegularShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostComment, Post, ReplyComment } from 'src/app/models/post';
import { PostService } from 'src/app/services/api/post.service';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserInfo } from 'src/app/models/profile';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostCommentService } from 'src/app/services/api/post-comment.service';
import { StompService } from 'src/app/services/ws/stomp.service';
import { formatDistanceToNow } from 'date-fns';
import { ReplyCommentService } from 'src/app/services/api/reply-comment.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
})
export class PostCommentComponent implements OnInit, OnDestroy {
  faRegularHeart = faRegularHeart;
  faSolidHeart = faSolidHeart;
  faRegularComments = faRegularComments;
  post!: Post;
  commentForm!: FormGroup;
  replyCommentForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private showToast: ToastService,
    private authService: AuthService,
    private postService: PostService,
    private postCommentService: PostCommentService,
    private replyCommentService: ReplyCommentService,
    private formBuilder: FormBuilder,
    private stompService: StompService
  ) {
    this.loadPostById(data);
  }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      content: [''],
    });
    // this.replyCommentForm = this.formBuilder.group({
    //   content: [],
    // });
    this.stompService.connect().then(() => {
      this.stompService.initializeTopicSubscription(
        '/topic/post-comment',
        (postCommentId: string) => {
          this.loadPostCommentById(postCommentId);
        }
      );
      this.stompService.initializeTopicSubscription(
        '/topic/reply-comment',
        (replyCommentId: string) => {
          this.loadReplyCommentById(replyCommentId);
        }
      );
    });
  }

  addReply(comment: PostComment) {
    this.replyCommentForm = this.formBuilder.group({
      commentId: [comment.id],
      content: [''],
    });
  }

  ngOnDestroy(): void {
    this.stompService.disconnect();
  }

  loadPostCommentById(postCommentId: string) {
    this.postCommentService.getPostComments(postCommentId).subscribe({
      next: (response) => {
        this.post.lstComments.unshift(response);
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

  loadReplyCommentById(replyCommentId: string) {
    this.replyCommentService.getReplyComments(replyCommentId).subscribe({
      next: (response) => {
        const postComment = this.post.lstComments.find((comment) => {
          return comment.id === response.postCommentId;
        });

        if (postComment) {
          postComment.lstReplyComments.unshift(response);
        }
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

  loadPostById(data: string) {
    this.postService.getPost(data).subscribe({
      next: (response) => {
        this.post = response;
        this.sortCommentsByCreatedAt(this.post.lstComments);
        this.sortReplyCommentsByCreatedAt(this.post.lstComments);
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

  private sortCommentsByCreatedAt(comments: PostComment[]) {
    comments.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  private sortReplyCommentsByCreatedAt(comments: PostComment[]) {
    comments.forEach((comment) => {
      if (comment.lstReplyComments) {
        comment.lstReplyComments.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    });
  }

  isLikedPost() {
    const currentUser = this.authService.getUserData() as UserInfo;

    const isLiked = this.post.lstLikes.find((like) => {
      return like.user.id === currentUser.id;
    });

    return isLiked ? true : false;
  }

  isLikedComment(postComment: PostComment) {
    const currentUser = this.authService.getUserData() as UserInfo;

    const isLiked = postComment.lstLikeComments.find((like) => {
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

  likeComment(postComment: PostComment) {
    const currentUser = this.authService.getUserData() as UserInfo;

    if (this.isLikedComment(postComment)) {
      // Unlike comment
      const likeComment = postComment.lstLikeComments.find((like) => {
        return like.user.id === currentUser.id;
      }) as any;

      this.postService.unlikeComment(likeComment.id).subscribe({
        next: (response) => {
          postComment.lstLikeComments = postComment.lstLikeComments.filter(
            (like) => {
              return like.id !== response;
            }
          );
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
      // Like comment
      this.postService.likeComment(postComment.id).subscribe({
        next: (response) => {
          postComment.lstLikeComments.unshift(response);
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

  submitReply(postCommentId: string) {
    if (this.replyCommentForm.value.content === '') {
      return;
    }

    this.replyCommentService
      .createReplyComment(
        postCommentId,
        this.replyCommentForm.value.content,
        postCommentId
      )
      .subscribe({
        next: () => {
          this.replyCommentForm.reset();
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
