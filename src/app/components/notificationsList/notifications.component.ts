import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from "@services/notification/notification.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  list?: any;
  private subscription: Subscription;
  constructor(private ns: NotificationService) {
    this.subscription = ns.data$.subscribe(list => {
      this.list = Object.values(list).sort((a, b) => (b.id - a.id));
    });
    ns.fetch();
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
