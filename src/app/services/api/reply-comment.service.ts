import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReplyCommentService {
  constructor(private http: HttpClient) {}

  createReplyComment(
    postCommentId: string,
    content: any,
    userId: string | null
  ) {
    return this.http.post<any>(`/api/posts/comment/${postCommentId}/reply`, {
      postCommentId,
      content,
      userId,
    });
  }

  getReplyComments(replyCommentId: string) {
    return this.http.get<any>(`/api/posts/comment/reply/${replyCommentId}`);
  }
}
