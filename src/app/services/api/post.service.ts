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

  getPostByUser(userId: string) {
    return this.http.get<any>(`/api/posts/user/${userId}`);
  }

  getPost(postId: string) {
    return this.http.get<any>(`/api/posts/${postId}`);
  }

  createPost(post: any) {
    return this.http.post<any>('/api/posts', post);
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

  createPostMedia(postId: string, files: File[]) {
    const formData = new FormData();
    // formData.append('multipartFile', files);
    files.forEach((file) => {
      formData.append('multipartFile', file);
    });
    return this.http.post<any>(`/api/posts/${postId}/media`, formData);
  }
}
