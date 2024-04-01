import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeAvatar, UserInfo } from 'src/app/models/profile';

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

  updateProfile(data: UserInfo) {
    return this.http.put<UserInfo>(`/api/user/profile/${data.id}`, data);
  }

  updateAvatar(userId: string, data: File) {
    const formData = new FormData();
    formData.append('multipartFile', data);
    return this.http.put<any>(`/api/user/profile/${userId}/avatar`, formData);
  }

  updateCover(userId: string, data: File) {
    const formData = new FormData();
    formData.append('multipartFile', data);
    return this.http.put<any>(`/api/user/profile/${userId}/cover`, formData);
  }
}
