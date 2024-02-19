import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from 'src/app/models/profile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getCurrentProfile() {
    return this.http.get<UserInfo>('/api/user/profile/me');
  }

  getProfile(userId: string) {
    return this.http.get<UserInfo>(`/api/user/profile/${userId}`);
  }
}
