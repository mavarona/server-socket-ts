import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketService) { }

  sendMessage( message: string ) {

    const payload = {
      from: this.wsService.getUser().name,
      body: message
    };

    this.wsService.emit('message', payload);

  }

  getMessages() {
    return this.wsService.listen('new-message');
  }

  getMessagesPrivate() {
    return this.wsService.listen('private-message');
  }

  getUsersActive() {
    return this.wsService.listen('active-users');
  }

}
