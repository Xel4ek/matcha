import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UserInfoService } from "@services/user-info/user-info.service";
import { WebsocketService } from "@services/websocket/websocket.service";
import { UserInfo } from "@services/user-info/user-info";

@Component({
  selector: 'app-user-widget[user]',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.scss']
})
export class UserWidgetComponent implements OnInit, AfterViewInit {
  @Input() private user!: string;
  _data?: UserInfo;
  imgSrc: string = 'assets/img/4e73208be9f326816a787de2e04db80a.jpg';
  constructor(private userInfo: UserInfoService,
              private ws: WebsocketService) {
    this.userInfo.data$.subscribe(userData => {
      this.data = userData[this.user];
    })
  }
  ngOnInit(): void {
  }
  get data(): UserInfo | undefined {
    return this._data;
  }
  set data(user: UserInfo | undefined) {
    this.imgSrc = user?.photo.paths.find( (src:string) => src.includes(user?.photo.profilePhoto)) ?? this.imgSrc;
    this._data = user;
  }
  ngAfterViewInit(): void {
      this.ws.send('userInfo', {login: this.user});
  }

}
