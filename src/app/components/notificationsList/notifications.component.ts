import { Component, OnInit } from '@angular/core';
import { NotificationService } from "@services/notification/notification.service";
import { Observable } from "rxjs";
import { NotificationMessage } from "@components/notificationsList/notification.interface";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  // subscription: Subscription;
  list: Observable<{ [id: string]: NotificationMessage }>
  counts: Observable<{ [p: string]: number }>;
  constructor(private ns: NotificationService) {
    this.list = ns.data$
    this.counts = ns.counts$;
    ns.fetch();
  }

  ngOnInit(): void {
  }

}
