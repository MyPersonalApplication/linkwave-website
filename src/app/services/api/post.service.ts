import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<any>('/api/posts');
  }

  getPost(postId: string) {
    return this.http.get<any>(`/api/posts/${postId}`);
  }

  likePost(postId: string) {
    return this.http.post<any>(`/api/posts/${postId}/like`, {});
  }

  unlikePost(postId: string) {
    return this.http.delete<any>(`/api/posts/${postId}/unlike`);
  }

  getPostLikes(postId: string) {
    return this.http.get<any>(`/api/posts/${postId}/likes`);
  }
}
