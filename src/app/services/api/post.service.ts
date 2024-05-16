import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(page: number, size: number) {
    const params = new HttpParams({
      fromObject: {
        page: page.toString(),
        pageSize: size.toString(),
      },
    });
    return this.http.get<any>('/api/posts', { params });
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

  unlikePost(postLikeId: string) {
    return this.http.delete<any>(`/api/posts/${postLikeId}/unlike`);
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

  likeComment(postCommentId: string) {
    return this.http.post<any>(`/api/posts/comment/${postCommentId}/like`, {});
  }

  unlikeComment(likeCommentId: string) {
    return this.http.delete<any>(`/api/posts/comment/${likeCommentId}/unlike`);
  }
}
