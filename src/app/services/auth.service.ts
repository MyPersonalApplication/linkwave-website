import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Token } from '../models/user';

const ACCESS_KEY = 'ACCESS_TOKEN';
const USER_KEY = 'USER_DATA';
const ROLE_KEY = 'USER_ROLE';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.http.post<Token>('/api/auth/login', {
      email,
      password,
    });
  }

  register(data: unknown) {
    return this.http.post<any>('/api/auth/register', data);
  }

  logout() {
    this.clearLoginData();
    this.router.navigate(['/login']);
  }

  clearLoginData() {
    this.storageService.remove(ACCESS_KEY);
    this.storageService.remove(USER_KEY);
    this.storageService.remove(ROLE_KEY);
  }

  getRefreshToken() {
    return this.http.post(
      '/api/auth/refresh',
      {
        //TODO - Check the request body of refresh Api and apply it here
        refesh_token:
          this.getTokenResponse()?.accessTokenResponse.refresh_token,
        access_token: this.getAccessToken(),
      },
      { withCredentials: true }
    );
  }

  //LOCAL SESSION
  saveUser(data: Token): void {
    this.saveToken(data.accessTokenResponse.access_token);
    this.storageService.save(ROLE_KEY, data.roles);
    this.storageService.save(USER_KEY, data.userId);
  }

  saveToken(data: unknown) {
    this.storageService.save(ACCESS_KEY, data);
  }

  getTokenResponse() {
    if (this.storageService.get(USER_KEY)) {
      return this.storageService.get(USER_KEY) as Token;
    }
    return null;
  }

  getAccessToken() {
    if (this.storageService.get(ACCESS_KEY)) {
      return this.storageService.get(ACCESS_KEY) as string;
    }
    return null;
  }

  getUserId() {
    if (this.storageService.get(USER_KEY)) {
      return this.storageService.get(USER_KEY);
    }
    return null;
  }

  getRoles(): string[] {
    if (this.storageService.get(ROLE_KEY)) {
      return this.storageService.get(ROLE_KEY) as string[];
    }
    return ['USER'];
  }

  public isLoggedIn(): boolean {
    if (this.getAccessToken()) {
      return true;
    }
    return false;
  }
}
