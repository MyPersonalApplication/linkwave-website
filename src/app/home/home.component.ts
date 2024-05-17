import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostComponent } from '../component/dialog/post/post.component';
import { faHandPointUp as faRegularHandPointUp } from '@fortawesome/free-regular-svg-icons';
import { Post, PostMedia } from '../models/post';
import { UserInfo } from '../models/profile';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/api/post.service';
import { ToastService } from '../services/toast.service';
import { Pagination } from '../models/base';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  faRegularHandPointUp = faRegularHandPointUp;
  showScrollTop = false;
  postList: Post[] = [];
  currentUser!: UserInfo;
  isLoading: boolean = true;
  isLoadMore: boolean = false;
  pagination: Pagination = {
    pageSize: 10,
    page: 0,
    totalRecords: 0,
  };

  constructor(
    private dialog: MatDialog,
    private showToast: ToastService,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.currentUser = this.authService.getUserData() as UserInfo;
  }

  loadPosts() {
    this.postService
      .getPosts(this.pagination.page, this.pagination.pageSize)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.postList = response.contents;
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

  toggleLoadMore = () => (this.isLoadMore = !this.isLoadMore);

  // this method will be called on scrolling the page
  appendData = () => {
    this.toggleLoadMore();
    this.postService
      .getPosts(this.pagination.page, this.pagination.pageSize)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.postList = [...this.postList, ...response.contents];
        },
        error: (response) => {
          this.showToast.showErrorMessage(
            'Error',
            response.error?.message ||
              'Something went wrong. Please try again later'
          );
        },
      });
  };

  openDialog() {
    const dialogRef = this.dialog.open(PostComponent, {
      maxHeight: '80%',
    });

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

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.showScrollTop = window.scrollY > 600;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    // Detect scroll end
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      window.innerHeight;
    const max = document.documentElement.scrollHeight;

    if (pos === max) {
      // Scroll end detected
      this.pagination.page++;
      this.appendData();
    }
  }
}
