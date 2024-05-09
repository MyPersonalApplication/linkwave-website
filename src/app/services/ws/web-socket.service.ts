import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private webSocket: Socket;

  constructor(private authService: AuthService) {
    const token = this.authService.getAccessToken();

    this.webSocket = new Socket({
      url: '/ws',
      options: {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${token}`, // Assign token in Authorization header
            },
          },
        },
      },
    });
  }

  // this method is used to start connection/handhshake of socket with server
  connectSocket(message: string) {
    this.webSocket.emit('connect', message);
  }

  // this method is used to get response from server
  receiveStatus() {
    return this.webSocket.fromEvent('/topic/chat');
  }

  // this method is used to end web socket connection
  disconnectSocket() {
    this.webSocket.disconnect();
  }
}
