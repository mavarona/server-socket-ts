import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  usersActive: Observable<any>;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.usersActive = this.chatService.getUsersActive();
    this.chatService.emitUsersActive();
  }

}
