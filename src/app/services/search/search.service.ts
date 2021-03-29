import { Injectable, OnDestroy } from '@angular/core';
import { WebsocketService } from "@services/websocket/websocket.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SearchService implements OnDestroy {
  private searchResults = new Subject<{profiles: string[]}>();
  private destroy$ = new Subject<void>();
  data$ = this.searchResults.asObservable();

  constructor(private ws: WebsocketService) {
    this.ws.on<{profiles: string[]}>('search').pipe(takeUntil(this.destroy$)).subscribe(data => this.searchResults.next(data))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
    this.searchResults.complete();
  }
}
