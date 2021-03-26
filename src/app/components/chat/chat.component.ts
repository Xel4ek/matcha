import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subject, Subscription } from "rxjs";
import { ChatService } from "@services/chat/chat.service";
import { ChatMessage } from "@services/chat/chat-message";
import { map, switchMap, takeUntil } from "rxjs/operators";
import { WebsocketService } from "@services/websocket/websocket.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  private id!: string;
  public key!: string;
  public chat: ChatMessage[] = [];
  private destroy = new Subject<void>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private ws: WebsocketService
  ) {
    activatedRoute.params.pipe(takeUntil(this.destroy))
      .pipe(switchMap( ({id}) => {
        this.id = id;
        return chatService.data$;
      }),map(chats => chats[this.id]))
      .subscribe( chat => {
        if (chat) {
          Object.values(chat).map(message => {
            const {from, to, timestamp } = message;
            this.ws.send('chat', { from, to, timestamp, isRead :true});
          });
          this.chat = Object.values(chat).sort((a, b) => a.timestamp - b.timestamp);
        } else {
          this.chat = [];
        }
    });

  }

  ngOnInit(): void {

  }
  send(text: HTMLInputElement) {
    console.log(text.value);
    this.chatService.send(this.id, text.value);
    text.value = '';
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
