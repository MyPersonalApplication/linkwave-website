import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  sendMessage(conversationId: string, content: string, files: File[]) {
    const formData = new FormData();
    formData.append('content', content);
    formData.append('conversationId', conversationId);
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append('multipartFiles', file);
      });
    } else {
      formData.append('multipartFiles', new Blob([]));
    }
    return this.http.post<any>('/api/messages', formData);
  }

  markAsRead(listMessageIds: string[]) {
    return this.http.put<any>(`/api/messages/mark-as-read`, { listMessageIds });
  }
}
