import { Component, OnInit } from '@angular/core';
import { MonthlyStats } from '../models/base';
import { StatisticService } from '../services/api/statistic.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.scss'],
})
export class AdminDasboardComponent {
  isLoading: boolean = false;
  totalUser: number = 0;

  constructor(
    private showToast: ToastService,
    private statisticService: StatisticService
  ) {}

  ngOnInit(): void {
    this.loadTotalUsers();
  }

  changeIsLoading() {
    this.isLoading = !this.isLoading;
  }

  loadTotalUsers() {
    this.changeIsLoading();
    this.statisticService.getTotalUsers().subscribe({
      next: (response: number) => {
        this.totalUser = response;
      },
      error: (response) => {
        this.showToast.showErrorMessage(
          'Error',
          response.error?.message ||
            'Something went wrong. Please try again later'
        );
      },
      complete: () => {
        this.changeIsLoading();
      },
    });
  }
}
