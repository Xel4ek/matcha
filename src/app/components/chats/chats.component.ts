import { Component, OnInit } from '@angular/core';
import { UserService } from "@services/user/user.service";
import { ChatInterface } from "@components/chats/chat/chat-interface";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  public chats: ChatInterface[];

  constructor(
    private user: UserService
  ) {
    this.chats = user.user.value.chats;
  }

  ngOnInit(): void {
  }

}
