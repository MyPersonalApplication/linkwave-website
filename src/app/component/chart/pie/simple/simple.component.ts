import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';
import { StatisticService } from 'src/app/services/api/statistic.service';
import { ToastService } from 'src/app/services/toast.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-chart-pie-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
})
export class SimpleComponent implements OnInit {
  isLoading: boolean = false;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};

  constructor(
    private showToast: ToastService,
    private statisticService: StatisticService
  ) {}

  ngOnInit(): void {
    this.loadPercentagePostMedia();
  }

  changeIsLoading() {
    this.isLoading = !this.isLoading;
  }

  loadPercentagePostMedia() {
    this.changeIsLoading();
    this.statisticService.getPercentagePostMedia().subscribe({
      next: (response: any) => {
        const withMedia = response.withMediaCount;
        const withoutMedia = response.withoutMediaCount;

        this.chartOptions = {
          series: [withMedia, withoutMedia],
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['With Media', 'Without Media'],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        };
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
