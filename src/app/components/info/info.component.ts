import { Component, OnDestroy, OnInit } from '@angular/core';
import {UserInfo} from "@services/user-info/user-info";
import {UserInfoService} from "@services/user-info/user-info.service";
import {ActivatedRoute} from "@angular/router";
import { Subscription } from "rxjs";
import { WebsocketService } from "@services/websocket/websocket.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {
  private login!: string;
  public carousel: { [index:string]:string }[] = []
  // public user: UserInfo | null = new UserInfo();
  public user: UserInfo | null = null;
  public advance: {[index:string]:any } = {}
  public panelOpenState = false;
  private routeSubscription?: Subscription;
  public notFound = false;
  private subscription: Subscription | null = null;
  constructor(
    private activateRoute: ActivatedRoute,
    private userInfoService: UserInfoService,
    private ws: WebsocketService
  ) {
    this.subscription = this.userInfoService.data$.subscribe( users => {
      this.user = users[this.login];
      this.prepareData();
    })
  }

  ngOnInit() {
    this.routeSubscription = this.activateRoute.params.subscribe(params=> {
      this.login = params['id'];
      this.ws.send('userInfo', {login: this.login});
    });
  }
  private prepareData() {
    if(!this.user?.photo.paths.length) this.user?.photo.paths.push('assets/img/4e73208be9f326816a787de2e04db80a.jpg');
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.subscription?.unsubscribe();
    this.subscription = null;
  }
}
