import {Component, Input, OnInit} from '@angular/core';
import {UserInfo} from "@services/user-info/user-info";
import {UserInfoService} from "@services/user-info/user-info.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  private readonly login: string;
  public user: UserInfo;
  constructor(
    private activateRoute: ActivatedRoute,
    private userInfoService: UserInfoService
  ) {
    this.login = activateRoute.snapshot.params['id'];
    this.user = this.userInfoService.user(this.login);
    this.user.age = ((new Date().getTime() - this.user.birthDay.getTime()) / (24 * 3600 * 365.25 * 1000)) | 0;
  }
  ngOnInit(): void {
    console.log(this.user);
  }
}
