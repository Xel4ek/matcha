import { Component, Input, OnInit } from '@angular/core';
import { NotificationMessage } from "@components/notificationsList/notification.interface";
import { NotificationService } from "@services/notification/notification.service";

@Component({
  selector: 'app-notification[entry]',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() entry!: NotificationMessage;
  constructor(private ns: NotificationService) {
  }
  remove() {
    this.ns.edit({id: this.entry.id, action: 'remove'});
  }
  checked() {
    if(!this.entry.checked) {
      this.ns.edit({id: this.entry.id, action: 'edit'});
    }
  }
  ngOnInit(): void {
  }

}
