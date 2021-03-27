import { Component, OnDestroy, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {WebsocketService} from "@services/websocket/websocket.service";
import {ToastrService} from "ngx-toastr";
import { User } from "@services/user/user";
import { Observable, Observer, Subscription } from "rxjs";
import { ProfileService } from "@services/profile/profile.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  public profile: User | null = null;
  private subscription: Subscription | null = null;
  constructor(public router: Router,
              private wsService: WebsocketService,
              private toastr: ToastrService,
              private profileService: ProfileService
  ) {
    this.subscription = this.profileService.data$.subscribe(profile => this.profile = profile);
    this.wsService.on<any>('message')
      .subscribe((message) => {
        this.toastr.success(message.text, message.title);
      });
    this.wsService.on<any>('error')
      .subscribe((message) => {
        this.toastr.error(message.text, message.title);
      });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subscription?.unsubscribe();
      this.subscription = null;
  }
}
