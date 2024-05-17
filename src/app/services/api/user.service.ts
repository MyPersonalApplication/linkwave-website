import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experience, Skill, UserInfo } from 'src/app/models/profile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(page: number, size: number) {
    const params = new HttpParams({
      fromObject: {
        page: page.toString(),
        pageSize: size.toString(),
      },
    });
    return this.http.get<any>('/api/users', { params });
  }

  searchUsers(query: string, page: number, size: number) {
    const params = new HttpParams({
      fromObject: {
        page: page.toString(),
        pageSize: size.toString(),
        query,
      },
    });
    return this.http.get<any>('/api/users/search', { params });
  }

  getCurrentProfile() {
    return this.http.get<UserInfo>('/api/users/profile/me');
  }

  changePassword(data: any) {
    return this.http.post('/api/users/change-password', data);
  }

  getProfile(userId: string) {
    return this.http.get<UserInfo>(`/api/users/profile/${userId}`);
  }

  updateProfile(data: UserInfo) {
    return this.http.put<UserInfo>(`/api/users/profile/${data.id}`, data);
  }

  updateAvatar(userId: string, data: File) {
    const formData = new FormData();
    formData.append('multipartFile', data);
    return this.http.put<any>(`/api/users/avatar/${userId}`, formData);
  }

  updateCover(userId: string, data: File) {
    const formData = new FormData();
    formData.append('multipartFile', data);
    return this.http.put<any>(`/api/users/cover/${userId}`, formData);
  }

  addExperience(data: Experience) {
    return this.http.post<Experience>(`/api/users/experience`, data);
  }

  updateExperience(data: Experience) {
    return this.http.put<Experience>(`/api/users/experience/${data.id}`, data);
  }

  deleteExperience(id: string) {
    return this.http.delete(`/api/users/experience/${id}`);
  }

  getSkills(userId: string) {
    return this.http.get<Skill>(`/api/users/skill/${userId}`);
  }

  addSkill(data: Skill) {
    return this.http.post<Skill>(`/api/users/skill`, data);
  }

  updateSkill(data: Skill) {
    return this.http.put<Skill>(`/api/users/skill/${data.id}`, data);
  }

  deleteSkill(id: string) {
    return this.http.delete(`/api/users/skill/${id}`);
  }
}
