import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ChatService } from "@services/chat/chat.service";
import { ChatMessage } from "@services/chat/chat-message";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  public token!: string;
  public key!: string;
  public chat: ChatMessage[] = [];
  private subscriber: Subscription;
  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
  ) {
    this.subscriber = activatedRoute.params.subscribe(params=> {
      this.token = params['id'];
      chatService.data$.subscribe( (chat) => {
        this.chat = Object.values(chat[this.token])
      });
    });

  }

  ngOnInit(): void {
  }
  send(text: HTMLInputElement) {
    console.log(text.value);
    this.chatService.send(this.token, text.value);
    text.value = '';
  }
  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }
}
