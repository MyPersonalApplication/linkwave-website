import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostCommentService {
  constructor(private http: HttpClient) {}

  commentPost(postId: string, content: string, userId: string | null) {
    return this.http.post<any>(`/api/posts/${postId}/comment`, {
      postId,
      content,
      userId,
    });
  }
}
