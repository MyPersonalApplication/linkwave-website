import { Component, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis,
} from 'ng-apexcharts';
import { MonthlyMessageStats } from 'src/app/models/base';
import { StatisticService } from 'src/app/services/api/statistic.service';
import { ToastService } from 'src/app/services/toast.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-chart-mix-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
})
export class LineComponent implements OnInit {
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
    this.statisticService.getMonthlyMessageStats().subscribe({
      next: (response: MonthlyMessageStats[]) => {
        // Prepare data for ApexCharts
        const categories = response.map((item: MonthlyMessageStats) =>
          this.getMonthName(Number(item.month))
        );
        const conversationCount = response.map(
          (item: MonthlyMessageStats) => item.conversationCount
        );
        const chatMessageCount = response.map(
          (item: MonthlyMessageStats) => item.chatMessageCount
        );

        this.chartOptions = {
          series: [
            {
              name: 'Messages',
              type: 'column',
              data: chatMessageCount,
            },
            {
              name: 'Conversation',
              type: 'line',
              data: conversationCount,
            },
          ],
          chart: {
            height: 350,
            type: 'line',
          },
          stroke: {
            width: [0, 4],
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
          },
          labels: categories,
          xaxis: {
            type: 'category',
          },
          yaxis: [
            {
              title: {
                text: 'Messages',
              },
            },
            {
              opposite: true,
              title: {
                text: 'Conversation',
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
