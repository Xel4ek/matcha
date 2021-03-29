import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { WebsocketService } from "@services/websocket/websocket.service";
import { ChatMessage } from "@services/chat/chat-message";
import { ProfileService } from "@services/profile/profile.service";
import { UserInfoService } from "@services/user-info/user-info.service";
import { map, takeUntil } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {
  private login: string | null = null;
  private subject = new BehaviorSubject<{ [index: string]: { [index: number]: ChatMessage } }>({});
  public data$ = this.subject.asObservable();
  private countSubject = new BehaviorSubject<{ [key: string]: number }>({_all: 0});
  messageCount$ = this.countSubject.asObservable();
  private destroy = new Subject<void>();

  constructor(private ws: WebsocketService, private profileService: ProfileService, private userInfo: UserInfoService) {
    this.profileService.data$.pipe(takeUntil(this.destroy)).subscribe(({login}) => this.login = login);
    ws.on<{ messages: ChatMessage[] }>('chat').pipe(
      map(({messages}) => {
        const chats = this.subject.getValue();
        messages.map((message) => {
          const {from, to, timestamp} = message;
          if (this.login === from) {
            chats[to] = {...chats[to], ...{[timestamp]: {...message, img: this.getImg(from)}}}
          }
          if (this.login === to) {
            chats[from] = {...chats[from], ...{[timestamp]: {...message, img: this.getImg(from)}}}
          }
        })
        console.log(chats);
        this.subject.next(chats);
        return chats;
      }), map(chats => {
        let count = {_all: 0};
        Object.entries(chats).map(([key, value]) => {
          const unReads = Object.values(value).reduce((acc, cur) => {
            if (!cur.isRead && cur.from !== this.login) {
              return acc + 1;
            }
            return acc;
          }, 0);
          count = {...count, _all: count._all + unReads, [key]: unReads};
        })
        this.countSubject.next(count);
      }),takeUntil(this.destroy)).subscribe();
  }

  ngOnDestroy(): void {
    this.subject.complete();
    this.countSubject.complete();
    this.destroy.next();
    this.destroy.complete();
  }

  send(to: string, message: string): void {
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

  getHistory(login: string) {
    this.ws.send('chat', {login})
  }

  private getImg(login: string): Observable<string> {
    return this.userInfo.data$.pipe(map(userData => {
      const data = userData[login];
      if (!data) this.ws.send('userInfo', {login});
      return data?.photo.paths.find((src: string) => src.includes(data?.photo.profilePhoto));
    }))
  }
}

