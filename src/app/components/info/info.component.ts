import { Component, OnDestroy, OnInit } from '@angular/core';
import {UserInfo} from "@services/user-info/user-info";
import {UserInfoService} from "@services/user-info/user-info.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { WebsocketService } from "@services/websocket/websocket.service";
import { ProfileService } from "@services/profile/profile.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {
  login!: string;
  profile?: string | null;
  public carousel: { [index:string]:string }[] = []
  // public user: UserInfo | null = new UserInfo();
  public index: number = 0;
  public age?: number;
  public user: UserInfo | null = null;
  public advance: {[index:string]:any } = {}
  public panelOpenState = false;
  private routeSubscription?: Subscription;
  public notFound = false;
  private subscriptions: Subscription[] = [];
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private userInfoService: UserInfoService,
    private ws: WebsocketService,
    private ps: ProfileService,
  ) {
    this.subscriptions.push(this.userInfoService.data$.subscribe( users => {
      this.user = users[this.login];
      this.prepareData();
    }))
    this.subscriptions.push(this.ps.data$.subscribe(profile => this.profile = profile.login));
  }
  startChat() {
    this.ws.send('chat', {login: this.login});
    this.router.navigate(['./chat/' + this.login]);

  }
  report() {
    this.ws.send('fakeRating', {login: this.login});
  }
  addBlackList() {
    if (this.user?.isBlocked) {
      this.ws.send('profile', {removeBlackList: this.login})
    } else {
      this.ws.send('profile', {blackList: this.login})
    }
  }
  addFavorite() {
    if (this.user?.isFavourite) {
      this.ws.send('profile', {removeFavoriteList: this.login})
    } else {
      this.ws.send('profile', {favorites: this.login})
    }
  }

  ngOnInit() {
    this.routeSubscription = this.activateRoute.params.subscribe(params=> {
      this.login = params['id'];
      this.ws.send('userInfo', {login: this.login, visit: true});
    });
  }
  private prepareData() {
    this.notFound = !!this.user?.notFound;
    if(this.notFound) {
      return;
    }
    if(!this.user?.photo.paths.length) {
      this.user?.photo.paths.push('assets/img/4e73208be9f326816a787de2e04db80a.jpg');
    }
    else {
      const paths = this.user.photo.paths;
      const profilePhoto = this.user.photo.profilePhoto;
      this.index = +paths.findIndex((path: string) => path.indexOf(profilePhoto) !== -1)
    }
    if (this.user) {
      this.age = ((new Date().getTime() - new Date(this.user.birthDay).getTime()) / (24 * 3600 * 365.25 * 1000)) | 0;
    }
  }
  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
