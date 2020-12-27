import {Injectable} from '@angular/core';
import {WebsocketService} from "@services/websocket/websocket.service";
import {UserInfo} from "@services/user-info/user-info";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private _users: {[index:string]:UserInfo} = {};

  constructor(
    private ws: WebsocketService,
  ) {
    console.log(ws.status.subscribe({
      next:(value => console.log('sw', value)),
      error: err => null,
    }));
    ws.on<UserInfo>('userInfo').subscribe({
      next: (user) => {
        console.log('new UserInfo', user);
        const key: number = user.id;
        if (this._users[key]) this._users[key].value = user
        else this._users[key] = new UserInfo(user)
      },
      error: error => console.log(error),
    })

  }

  user(login: string): UserInfo {
    this.ws.send('userInfo', {login});
    if (!this._users[login]) {
      this._users[login] = new UserInfo();
    }
    return <UserInfo>this._users[login];
  }
}
