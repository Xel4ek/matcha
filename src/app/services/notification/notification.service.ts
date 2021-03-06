import { Injectable, OnDestroy } from '@angular/core';
import { WebsocketService } from '@services/websocket/websocket.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { NotificationMessage } from '@components/notificationsList/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  subscriptions: Subscription[] = [];
  private subject = new BehaviorSubject<{ [id: string]: NotificationMessage }>(
    {}
  );
  data$ = this.subject.asObservable();
  private countSubject = new BehaviorSubject<{ [type: string]: number }>({});
  count$ = this.countSubject.asObservable();

  constructor(private ws: WebsocketService) {
    this.subscriptions.push(
      this.ws
        .on<{ history: NotificationMessage[] }>('notification')
        .subscribe((list) => {
          const data = this.subject.getValue();
          list.history.map((message) => {
            data[message.id] = message;
          });
          this.update(data);
        })
    );
  }

  update(data: { [id: string]: NotificationMessage }): void {
    const count: { [type: string]: number } = { all: 0 };

    Object.values(data).map((entry) => {
      if (!entry.checked) {
        count[entry.type] = (count[entry.type] ?? 0) + 1;
        count.all++;
      }
    });
    this.subject.next(data);
    this.countSubject.next(count);
  }

  edit({ action, id }: { action: 'remove' | 'edit'; id: number }): void {
    const data = this.subject.getValue();
    if (action === 'remove') {
      delete data[id];
      this.ws.send('notification', { id, removed: true });
    }
    if (action === 'edit') {
      data[id].checked = true;
      this.ws.send('notification', { id, checked: true });
    }
    this.update(data);
  }

  ngOnDestroy(): void {
    this.subject.complete();
    this.countSubject.complete();
    this.subscriptions.map((subscription) => subscription.unsubscribe());
  }
}
