import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FriendRequestService {
  constructor(private http: HttpClient) {}

  getFriendRequests(limit: number = -1) {
    const params = new HttpParams({
      fromObject: {
        limit: limit,
      },
    });
    return this.http.get<any>('/api/friends/requests', { params });
  }

  getRecommendFriends(limit: number = -1) {
    const params = new HttpParams({
      fromObject: {
        limit: limit,
      },
    });
    return this.http.get<any>('/api/friends/recommends', { params });
  }

  searchUser(query: string, page: number, size: number) {
    const params = new HttpParams({
      fromObject: {
        page: page.toString(),
        pageSize: size.toString(),
        query,
      },
    });
    return this.http.get<any>('/api/friends/search', { params });
  }

  sendFriendRequest(userId: string) {
    return this.http.post<any>('/api/friends/send', { receiverId: userId });
  }

  acceptFriendRequest(id: string) {
    return this.http.put<any>(`/api/friends/accept/${id}`, {});
  }

  rejectFriendRequest(id: string) {
    return this.http.put<any>(`/api/friends/reject/${id}`, {});
  }

  deleteFriendRequest(id: string) {
    return this.http.delete<any>(`/api/friends/delete/${id}`);
  }
}
