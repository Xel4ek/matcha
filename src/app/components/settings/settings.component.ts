import { Component, OnInit } from '@angular/core';
import {User} from "@services/user/user";
import {UserService} from "@services/user/user.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public user: User;

  constructor(
    private userService:UserService
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {

  }

}
