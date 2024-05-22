import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';
import { MonthlyStats } from 'src/app/models/base';
import { StatisticService } from 'src/app/services/api/statistic.service';
import { ToastService } from 'src/app/services/toast.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-chart-column-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit {
  isLoading: boolean = false;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};

  constructor(
    private showToast: ToastService,
    private statisticService: StatisticService
  ) {}

  ngOnInit(): void {
    this.loadMonthlyStats();
  }

  changeIsLoading() {
    this.isLoading = !this.isLoading;
  }

  loadMonthlyStats() {
    this.changeIsLoading();
    this.statisticService.getMonthlyPostStats().subscribe({
      next: (response: MonthlyStats[]) => {
        // Prepare data for ApexCharts
        const categories = response.map((item: MonthlyStats) =>
          this.getMonthName(Number(item.month))
        );
        const postCounts = response.map((item: MonthlyStats) => item.postCount);
        const postLikeCounts = response.map(
          (item: MonthlyStats) => item.postLikeCount
        );
        const postCommentCounts = response.map(
          (item: MonthlyStats) => item.postCommentCount
        );

        this.chartOptions = {
          series: [
            {
              name: 'Post',
              data: postCounts,
            },
            {
              name: 'Likes',
              data: postLikeCounts,
            },
            {
              name: 'Comments',
              data: postCommentCounts,
            },
          ],
          chart: {
            type: 'bar',
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
          },
          xaxis: {
            categories: categories,
          },
          yaxis: {
            title: {
              text: 'Quantity',
            },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return `${val} units`;
              },
            },
          },
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

  getMonthName(monthNumber: number) {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return monthNames[monthNumber - 1];
  }
}
