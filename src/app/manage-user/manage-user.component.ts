import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserInfo } from '../models/profile';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pagination, SearchResponse, TableAction } from '../models/base';
import { UserService } from '../services/api/user.service';
import { ToastService } from '../services/toast.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent implements OnInit, AfterViewInit {
  users: UserInfo[] = [];
  disableDefaultAction?: boolean = false;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'position',
    'firstName',
    'lastName',
    'email',
    'gender',
    'country',
    'avatar',
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
      tooltip: 'View User',
      action: (row) => this.onEdit(row.id),
    },
  ];

  constructor(
    private userService: UserService,
    private showToast: ToastService
  ) {}

  ngOnInit(): void {
    this.displayedColumns.push('actions');
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onEdit(id: string) {
    console.log('🚀 ~ ManageUserComponent ~ onEdit ~ id:', id);
  }

  loadUsers() {
    this.userService
      .getAllUsers(this.pagination.page, this.pagination.pageSize)
      .subscribe({
        next: (response: SearchResponse<UserInfo>) => {
          this.users = response.contents;
          this.dataSource.data = this.users.map((user, index) => ({
            id: user.id,
            position: index + 1,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            gender: user.profile.gender ? 'Male' : 'Female',
            country: user.profile.country ?? 'N/A',
            avatar: user?.avatar?.imageUrl,
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
    this.loadUsers();
  }
}
