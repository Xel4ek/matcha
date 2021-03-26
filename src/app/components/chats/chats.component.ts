import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "@services/user/user.service";
import { ChatInterface } from "@components/chat/chat-interface";
import { User } from "@services/user/user";
import { ProfileService } from "@services/profile/profile.service";
import { Router } from "@angular/router";
import { WebsocketService } from "@services/websocket/websocket.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ChatService } from "@services/chat/chat.service";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit, OnDestroy{
  public activeChatsUsers: string[] = [];
  private destroy = new Subject<void>();
  newMessageCount?: {[user: string]: number};
  constructor(private ps: ProfileService, private router: Router,
              private ws: WebsocketService, private chatService: ChatService) {
    // this.chats = Object.keys(new User().chats);
    ps.data$.pipe(takeUntil(this.destroy)).subscribe(profile => this.activeChatsUsers = profile.activeChats);
    chatService.messageCount$.pipe(takeUntil(this.destroy)).subscribe(counts => this.newMessageCount = counts);
  }

  ngOnInit(): void {
  }
  openChat(user: string) {
    this.router.navigate(['/chat/' + user]);
  }
  removeActive(login: string) {
    this.ws.send('ActiveChat', {login});
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
