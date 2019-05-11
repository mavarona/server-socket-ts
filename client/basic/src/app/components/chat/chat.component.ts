import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { message } from '../../../../../../server/sockets/socket';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  message = '';
  messageSubscription: Subscription;
  messages: Array<any> = new Array<any>();
  element: HTMLElement;

  constructor(public chatService: ChatService) { }

  ngOnInit() {

    this.element = document.getElementById('chat-messages');

    this.messageSubscription = this.chatService
        .getMessages()
        .subscribe((msg) => {
          this.messages.push(msg);
          setTimeout(() => {
            this.element.scrollTop = this.element.scrollHeight;
          }, 50);
        });

  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  send() {
    if (this.message.trim().length === 0) {
      return;
    }
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
