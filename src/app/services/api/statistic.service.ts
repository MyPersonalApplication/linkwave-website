import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) {}

  getMonthlyPostStats() {
    return this.http.get<any>('/api/statistics/post/monthly');
  }

  getMonthlyMessageStats() {
    return this.http.get<any>('/api/statistics/chat/monthly');
  }

  getTotalUsers() {
    return this.http.get<any>('/api/statistics/user/totals');
  }

  getPercentagePostMedia() {
    return this.http.get<any>('/api/statistics/percentage-post-media');
  }
}
