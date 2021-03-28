import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserInfo } from "@services/user-info/user-info";
import { UserInfoService } from "@services/user-info/user-info.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { WebsocketService } from "@services/websocket/websocket.service";
import { ProfileService } from "@services/profile/profile.service";
import { takeUntil } from "rxjs/operators";
import { CustomMarker } from "@components/map/map";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {
  login!: string;
  profile?: string | null;
  public carousel: { [index: string]: string }[] = []
  marker: { [user: string]: CustomMarker } = {}
  public index: number = 0;
  public age?: number;
  public user: UserInfo | null = null;
  public advance: { [index: string]: any } = {}
  public panelOpenState = false;
  public notFound = false;
  likeAvailable: boolean = false;
  private destroy = new Subject<void>();

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private userInfoService: UserInfoService,
    private ws: WebsocketService,
    private ps: ProfileService,
  ) {
    this.userInfoService.data$.pipe(takeUntil(this.destroy)).subscribe(users => {
      this.user = users[this.login];
      if (this.user) {
        const {latitude: lat, longitude: lng} = this.user.coordinates;
        this.marker = {
          [this.login]: {
            latlng: [lat, lng],
            popup: this.user.name.firstName + ' ' + this.user.name.lastName
          }
        }
      }
      this.notFound = !!this.user?.notFound;
    })
    this.ps.data$.pipe(takeUntil(this.destroy)).subscribe(profile => {
      this.profile = profile.login;
      this.likeAvailable = profile.photo?.paths.length !== 0;
    });
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
    this.activateRoute.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      this.login = params['id'];
      this.ws.send('userInfo', {login: this.login, visit: true});
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
