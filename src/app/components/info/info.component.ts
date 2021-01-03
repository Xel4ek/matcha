import { Component, OnDestroy, OnInit } from '@angular/core';
import {UserInfo} from "@services/user-info/user-info";
import {UserInfoService} from "@services/user-info/user-info.service";
import {ActivatedRoute} from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit, OnDestroy {
  private login!: string;
  public carousel: { [index:string]:string }[] = []
  public user: UserInfo = new UserInfo();
  public advance: {[index:string]:any } = {}
  public panelOpenState = false;
  private subscription?: Subscription;
  private observer: any;
  public notFound = false;
  constructor(
    private activateRoute: ActivatedRoute,
    private userInfoService: UserInfoService
  ) {
    this.prepareData();
  }

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params=> {
      this.login = params['id'];
      this.observer?.complete();
      console.log('subscribeOn', this.login);
      this.observer = this.userInfoService.on<UserInfo>(this.login).subscribe({
        next: (data) => {
        this.user.value = data;
        this.prepareData();
        console.log('test', data);
      }, error: () => this.notFound = true,
    });
    });
  }
  private prepareData() {
    if(!this.user.photo.paths.length) this.user.photo.paths.push('assets/img/4e73208be9f326816a787de2e04db80a.jpg');
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
