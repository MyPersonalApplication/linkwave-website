import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FriendRequestService {
  constructor(private http: HttpClient) {}

  getFriendRequests() {
    return this.http.get<any>('/api/friend-request');
  }

  sendFriendRequest(userId: string) {
    return this.http.post<any>('/api/friend-request', { receiverId: userId });
  }

  acceptFriendRequest(id: string) {
    return this.http.put<any>(`/api/friend-request/accept/${id}`, {});
  }

  rejectFriendRequest(id: string) {
    return this.http.put<any>(`/api/friend-request/reject/${id}`, {});
  }
}
