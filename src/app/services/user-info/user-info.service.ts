import {Injectable} from '@angular/core';
import {WebsocketService} from "@services/websocket/websocket.service";
import {UserInfo} from "@services/user-info/user-info";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private _users: Map<number, UserInfo> = new Map<number, UserInfo>();

  constructor(
    private ws: WebsocketService,
  ) {
    console.log(ws.status.subscribe({
      next:(value => console.log('sw', value)),
      error: err => null,
    }));
    ws.on<UserInfo>('userInfo').subscribe({
      next: (user) => {
        const key: number = user.id;
        if (this._users.has(key)) this._users.set(key, this._users.get(key)!.value = user);
        else this._users.set(key, new UserInfo(user));
      },
      error: error => console.log(error),
    })

  }

  user(id: number): UserInfo {
    if (!this._users.has(id)) {
      this._users.set(id, new UserInfo());
      this.ws.send('userInfo', {id});
    }
    return <UserInfo>this._users.get(id);
  }
}
