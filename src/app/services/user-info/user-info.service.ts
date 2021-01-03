import { Injectable, OnDestroy } from '@angular/core';
import {WebsocketService} from "@services/websocket/websocket.service";
import {UserInfo} from "@services/user-info/user-info";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map, publishReplay, refCount } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService implements OnDestroy{
  private _users: {[index:string]:UserInfo} = {};
  private subject: BehaviorSubject<{ [index: string]: UserInfo }> = new BehaviorSubject(this._users);
  constructor(
    private ws: WebsocketService,
  ) {
    ws.on<UserInfo>('userInfo').subscribe({
      next: (user) => {
        console.log('new UserInfo', user);
        this._users[user.login].value = user
        this.subject.next(this._users);
      },
      error: error => console.log(error),
    })

  }

  ngOnDestroy(): void {
        this.subject.unsubscribe();
    }

  on<T>(user:string):Observable<UserInfo> {
    if (!this._users[user]) {
      this._users[user] = new UserInfo();
    }
    this.ws.send('userInfo', {login:user});
    return this.subject.pipe(map(users => users[user]));
  }
}
