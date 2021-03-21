import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { NotificationService } from "@services/notification/notification.service";

@Component({
  selector: 'app-widget-notification[key]',
  templateUrl: './widget-notification.component.html',
  styleUrls: ['./widget-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetNotificationComponent implements OnInit, OnDestroy  {
  @Input() key!: 'all' | 'likes';
  subscription?: Subscription;
  notificationCount: number = 0;
  constructor(private ns: NotificationService) {
    this.subscription = this.ns.count$.subscribe(count => {
      this.notificationCount = count[this.key];
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

}
