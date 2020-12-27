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
  }
  ngOnInit(): void {
    console.log(this.user);
  }
}
