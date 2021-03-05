import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ProfileService } from "@services/profile/profile.service";
import { WebsocketService } from "@services/websocket/websocket.service";

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.scss']
})
export class WidgetListComponent implements OnInit, OnDestroy {
  list: { user: string, time: number }[] = [];
  private field = '';
  action = '';
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private ps: ProfileService,
              private router: Router,
              private ws: WebsocketService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.route.data.subscribe(({key}: { [index: string]: string }) => {
      this.action = key.replace(/^\w/, (c) => c.toUpperCase());
      if (key === 'favorite') {
        this.field = 'favoriteList';
      }
      if (key === 'blacklist') {
        this.field = 'blackList';
      }
      if (this.field) {
        this.subscriptions.push(this.ps.data$.subscribe((profile) => {
          this.list = profile[this.field];
        }))
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.map((subs => subs.unsubscribe()));
    this.subscriptions = [];
  }
  remove(user: string) {
    this.ws.send('profile', {['remove' + this.action]: [user]})
  }
}
