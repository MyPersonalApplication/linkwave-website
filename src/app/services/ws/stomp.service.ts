import { Injectable } from '@angular/core';
import * as SocketJs from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  socket = new SocketJs('/ws');
  stompClient = Stomp.over(this.socket);

  subscribe(topic: string, callback: (message: any) => void): void {
    const connected: boolean = this.stompClient.connected;

    if (connected) {
      this.subscribeToTopic(topic, callback);
      return;
    }

    this.stompClient.connect({}, () => {
      this.subscribeToTopic(topic, callback);
    });
  }

  private subscribeToTopic(
    topic: string,
    callback: (message: any) => void
  ): void {
    this.stompClient.subscribe(topic, (message: any) => {
      callback(JSON.parse(message.body));
    });
  }
}
