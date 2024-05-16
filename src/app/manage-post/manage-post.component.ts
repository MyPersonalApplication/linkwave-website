import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from '../models/post';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PostService } from '../services/api/post.service';
import { ToastService } from '../services/toast.service';
import { Pagination, SearchResponse, TableAction } from '../models/base';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.scss'],
})
export class ManagePostComponent implements OnInit, AfterViewInit {
  posts: Post[] = [];
  disableDefaultAction?: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'position',
    'content',
    'fullName',
    'email',
    'avatar',
    'date',
  ];
  dataSource = new MatTableDataSource<any>();
  pagination: Pagination = {
    pageSize: 10,
    page: 0,
    totalRecords: 0,
  };
  actions: TableAction<any>[] = [
    {
      icon: 'visibility',
      color: 'warn',
      tooltip: 'View Post',
      action: (row) => this.onEdit(row.id),
    },
  ];

  constructor(
    private postService: PostService,
    private showToast: ToastService
  ) {}

  ngOnInit(): void {
    this.displayedColumns.push('actions');
    this.loadPosts();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onEdit(id: string) {
    console.log('🚀 ~ ManagePostComponent ~ onEdit ~ id:', id);
    // this.router.navigate([this.editRouting, id]);
  }

  loadPosts() {
    this.postService
      .getPosts(this.pagination.page, this.pagination.pageSize)
      .subscribe({
        next: (response: SearchResponse<Post>) => {
          this.posts = response.contents;
          this.dataSource.data = this.posts.map((post, index) => ({
            id: post.id,
            position: index + 1,
            content: post.content,
            fullName: `${post.user?.firstName} ${post.user?.lastName}`,
            email: post.user?.email,
            avatar: post.user?.avatar?.imageUrl,
            date: post.createdAt,
          }));
          this.pagination.totalRecords = response.totalSize;
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

  onPageChange(event: PageEvent) {
    this.pagination.page = event.pageIndex;
    this.pagination.pageSize = event.pageSize;
    this.loadPosts();
  }
}
