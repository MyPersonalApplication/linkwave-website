import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor(private authService: AuthService) {
    const authToken = this.authService.getAccessToken();

    this.socket = io('/ws', {
      path: '/ws',
      reconnection: true,
      autoConnect: false,
      extraHeaders: {
        Authorization: 'Bearer ' + authToken,
      },
    }); // Replace with your server URL

    // Manually connect when ready
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  // Example method to emit a message to the server
  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  // Example method to listen for messages from the server
  receiveMessage(callback: (message: string) => void) {
    this.socket.on('chat', callback);
  }
}
