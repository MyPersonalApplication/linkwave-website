import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private http: HttpClient) {}

  createConversation(friendId: string) {
    return this.http.post<any>('/api/conversations', { friendId });
  }

  getConversationList() {
    return this.http.get<any>('/api/conversations');
  }

  getConversationById(conversationId: string) {
    return this.http.get<any>(`/api/conversations/${conversationId}`);
  }

  removeConversation(conversationId: string) {
    return this.http.delete<any>(`/api/conversations/${conversationId}`);
  }
}
