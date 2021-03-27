import { Injectable } from '@angular/core';
import { WebsocketService } from "@services/websocket/websocket.service";
import { User } from "@services/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private ws: WebsocketService,
  ) {
    ws.on<User>('profile').subscribe({
      next: (user) => {
        this._user.value = user;
      },
    })

  }

  private _user: User = new User();

  get user() {
    return this._user.value;
  }
}
