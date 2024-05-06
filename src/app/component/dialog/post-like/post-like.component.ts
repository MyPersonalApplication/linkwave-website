import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostLike } from 'src/app/models/post';
import { PostService } from 'src/app/services/api/post.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-post-like',
  templateUrl: './post-like.component.html',
  styleUrls: ['./post-like.component.scss'],
})
export class PostLikeComponent {
  postLikes: PostLike[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private showToast: ToastService,
    private postService: PostService
  ) {
    this.loadPostLike(data);
  }

  loadPostLike(data: string) {
    this.postService.getPostLikes(data).subscribe({
      next: (response) => {
        this.postLikes = response;
        console.log(
          '🚀 ~ PostLikeComponent ~ this.postService.getPostLikes ~ this.postLikes:',
          this.postLikes
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
  }
}
