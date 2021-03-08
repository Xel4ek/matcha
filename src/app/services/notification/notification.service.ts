import { Injectable, OnDestroy } from '@angular/core';
import { WebsocketService } from "@services/websocket/websocket.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { NotificationMessage, NotificationType } from "@components/notificationsList/notification.interface";
import { tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnDestroy {
  subscriptions: Subscription[] = [];
  private subject = new BehaviorSubject<{[id: string]: NotificationMessage}>({});
  private subjectCounts = new BehaviorSubject<{[type: string]: number}>({});
  counts$ = this.subjectCounts.asObservable();
  data$ = this.subject.asObservable().pipe(tap((data)=>{
    const counts:{[type: string]: number} = {};
    Object.values(data).map(notification => {
      if(!notification.checked) {
        counts[notification.type] = counts[notification.type]++ ?? 0;
      }
    })
    this.subjectCounts.next(counts);
  }));
  constructor(private ws: WebsocketService) {
    this.subscriptions.push(this.ws.on<{history: NotificationMessage[]}>('notification')
      .subscribe(list => {
        const data = this.subject.value;
        list.history.map(message => {
          data[message.id] = message;
        })
        this.subject.next(data);
      }))
  }

  fetch(id = 0) {
    this.ws.send('notification', {since: id})
  }

  edit({action, id}: {action: 'remove' | 'edit', id: string}) {
    const data = this.subject.value;
    if(action === 'remove') {
        delete data[id];
      }
    if(action === 'edit') {
      data[id].checked = true;
    }
    this.subject.next(data);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }
}
