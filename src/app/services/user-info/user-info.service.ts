import { Injectable, OnDestroy } from '@angular/core';
import { WebsocketService } from "@services/websocket/websocket.service";
import { UserInfo } from "@services/user-info/user-info";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "@services/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService implements OnDestroy {
  private _users: { [index: string]: UserInfo } = {};
  private subject: BehaviorSubject<{ [index: string]: UserInfo }> = new BehaviorSubject(this._users);
  data$: Observable<{[index:string]: UserInfo}> = this.subject.asObservable();

  constructor(
    private ws: WebsocketService,
  ) {
    ws.on<UserInfo>('userInfo').subscribe({
      next: (user) => {
        this._users[user.login] = user
        this.subject.next(this._users);
      },
      error: error => console.log(error),
    })

  }

  ngOnDestroy(): void {
    this.subject.unsubscribe();
  }

  // on<T>(user: string): Observable<UserInfo> {
  //   if (!this._users[user]) {
  //     this._users[user] = new UserInfo();
  //   }
  //   this.ws.send('userInfo', {login: user});
  //   return this.subject.pipe(map(users => users[user]));
  // }
}
