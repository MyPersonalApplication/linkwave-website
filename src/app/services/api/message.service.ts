import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  sendMessage(
    conversationId: string,
    content: string,
    senderId: string | null
  ) {
    return this.http.post<any>('/api/messages', {
      conversationId,
      content,
      senderId,
    });
  }

  markAsRead(listMessageIds: string[]) {
    return this.http.put<any>(`/api/messages/mark-as-read`, { listMessageIds });
  }
}
