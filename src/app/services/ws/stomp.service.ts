import { Injectable } from '@angular/core';
import * as SocketJs from 'sockjs-client';
import * as Stomp from 'stompjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  private stompClient: any = null;
  private socket: any = null;

  constructor(private authService: AuthService) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket = new SocketJs('/websocket');
      this.stompClient = Stomp.over(this.socket);

      this.stompClient.connect(
        {
          'X-Authorization': `Bearer ${this.authService.getAccessToken()}`,
        },
        () => {
          resolve();
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  initializeTopicSubscription(
    topic: string,
    callback: (message: any) => void
  ): void {
    if (!this.stompClient || !this.stompClient.connected) {
      throw new Error('STOMP client is not connected');
    }

    this.stompClient.subscribe(topic, (message: any) => {
      callback(JSON.parse(message.body));
    });
  }

  sendMessage(destination: string, payload: any): void {
    if (!this.stompClient || !this.stompClient.connected) {
      throw new Error('STOMP client is not connected');
    }

    this.stompClient.send(destination, {}, JSON.stringify(payload));
  }

  disconnect(): void {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
      });
      this.stompClient = null;
      this.socket = null;
    }
  }
}
