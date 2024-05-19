import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FriendShipService {
  constructor(private http: HttpClient) {}

  getFriendList(limit: number = -1) {
    const params = new HttpParams({
      fromObject: {
        limit: limit,
      },
    });
    return this.http.get<any>('/api/friendships', { params });
  }

  unFriend(friendId: string) {
    return this.http.delete<any>(`/api/friendships/unfriend/${friendId}`);
  }
}
