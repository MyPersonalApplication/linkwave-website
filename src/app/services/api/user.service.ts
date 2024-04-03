import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeAvatar, Experience, UserInfo } from 'src/app/models/profile';

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

  getWorkExperiences(userId: string) {
    return this.http.get<Experience>(`/api/user/experience/${userId}`);
  }

  getEducationExperiences(userId: string) {
    return this.http.get<Experience>(`/api/user/experience/${userId}`);
  }

  addExperience(data: Experience) {
    return this.http.post<Experience>(`/api/user/experience`, data);
  }

  updateExperience(data: Experience) {
    return this.http.put<Experience>(`/api/user/experience/${data.id}`, data);
  }

  deleteExperience(id: string) {
    return this.http.delete(`/api/user/experience/${id}`);
  }
}
