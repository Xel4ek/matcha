import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserInfoService } from "@services/user-info/user-info.service";
import { WebsocketService } from "@services/websocket/websocket.service";
import { UserInfo } from "@services/user-info/user-info";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-user-widget[user]',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.scss']
})
export class UserWidgetComponent implements OnInit, OnDestroy {
  @Input() user!: string;
  _data?: UserInfo;
  imgSrc: string = 'assets/img/4e73208be9f326816a787de2e04db80a.jpg';
  subscription?: Subscription;
  constructor(private userInfo: UserInfoService,
              private ws: WebsocketService) {
  }
  ngOnInit(): void {
    this.subscription = this.userInfo.data$.subscribe(userData => {
      const user = userData[this.user];
      if (user) {
        this.data = user;
      } else {
        this.ws.send('userInfo', {login: this.user});
      }
    })
  }
  get data(): UserInfo | undefined {
    return this._data;
  }
  set data(user: UserInfo | undefined) {
    this.imgSrc = user?.photo?.paths.find( (src:string) => src.includes(user?.photo.profilePhoto)) ?? this.imgSrc;
    this._data = user;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
