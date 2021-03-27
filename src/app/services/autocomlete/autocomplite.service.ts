import { Injectable, OnDestroy } from '@angular/core';
import { WebsocketService } from "@services/websocket/websocket.service";
import { BehaviorSubject, Subscription } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService implements OnDestroy {
  private subject = new BehaviorSubject<string[]>([]);
  data$ = this.subject.asObservable();
  private subscription: Subscription;

  constructor(private ws: WebsocketService) {
    this.subscription = this.ws.on<string[]>('findTag').subscribe((list) => this.subject.next(list));
  }

  query(input: string) {
    const trimmed = input.trim();
    if (trimmed) {
      this.ws.send('findTag', trimmed);
    } else {
      // this.subject.next([]);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
