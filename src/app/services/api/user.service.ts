import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ChangeAvatar,
  Experience,
  Skill,
  UserInfo,
} from 'src/app/models/profile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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

  // getWorkExperiences(userId: string) {
  //   return this.http.get<Experience>(`/api/users/experience/${userId}`);
  // }

  // getEducationExperiences(userId: string) {
  //   return this.http.get<Experience>(`/api/users/experience/${userId}`);
  // }

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
