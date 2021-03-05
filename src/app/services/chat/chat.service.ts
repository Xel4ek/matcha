import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { WebsocketService } from "@services/websocket/websocket.service";
import { ChatMessage } from "@services/chat/chat-message";
import { ProfileService } from "@services/profile/profile.service";
import { User } from "@services/user/user";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private login: string | null = null;
  private subject = new BehaviorSubject<{[index:string]: { [index:string]: ChatMessage }}>({});
  // private subject = new BehaviorSubject<{[index:string]: { [index:string]: ChatMessage }}>(new User().chats);
  public data$ = this.subject.asObservable();
  constructor(private ws: WebsocketService, private profileService: ProfileService) {
    this.profileService.data$.subscribe(({login}) => this.login = login);
    ws.on<{ messages: ChatMessage[] }>('chat').subscribe(({messages}) => {
      const chats = this.subject.value;
      console.log(messages, chats);
      messages.map((message) => {
        const {from, to, timestamp} = message;
        if (this.login === from) {
          chats[to] = {...chats[to], ...{ [timestamp]: { ...message, alignment: this.login === to}}}
          }
        if (this.login === to) {
          chats[from] = {...chats[from], ...{ [timestamp]: { ...message, alignment: this.login === to}}}
        }
      })
      this.subject.next(chats);
    })
  }
  send(to: string, message: string):void {
    if (to && message) {
      const data = {
        from: this.login,
        to,
        date: new Date().getTime(),
        text: message
      }
      this.ws.send('chat', data);
    }
  }
  getHistory(login: string){
    this.ws.send('chat',{login})
  }
}

