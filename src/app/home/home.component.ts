import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostComponent } from '../component/dialog/post/post.component';
import { faHandPointUp as faRegularHandPointUp } from '@fortawesome/free-regular-svg-icons';
import { PostList } from '../models/post';
import { Profile, UserInfo } from '../models/profile';
import mockUserProfile from 'src/app/mock/user-profile.json';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/api/post.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  faRegularHandPointUp = faRegularHandPointUp;
  showScrollTop = false;
  postList: PostList[] = [];

  constructor(
    private dialog: MatDialog,
    private showToast: ToastService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe({
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

  openDialog() {
    const dialogRef = this.dialog.open(PostComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
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
}
