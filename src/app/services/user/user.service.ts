import { Injectable } from '@angular/core';
import {WebsocketService} from "@services/websocket/websocket.service";
import {User} from "@services/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User = new User();
  constructor(
    private ws:WebsocketService,
  ) {
    ws.on<User>('profile').subscribe({
      next: (user) => {
        this._user.value = user;
      },
    })

  }
  get user() {
    return this._user.value;
  }
}
