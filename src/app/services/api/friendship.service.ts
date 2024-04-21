import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FriendShipService {
  constructor(private http: HttpClient) {}

  getFriendList() {
    return this.http.get<any>('/api/friendships');
  }

  unFriend(friendId: string) {
    return this.http.delete<any>(`/api/friendships/unfriend/${friendId}`);
  }
}
