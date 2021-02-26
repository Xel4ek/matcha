import { AfterViewInit, ElementRef, Injectable, OnDestroy, ViewChild } from '@angular/core';
import { WebsocketService } from "@services/websocket/websocket.service";
import { BehaviorSubject } from "rxjs";
import { MapComponent } from "@components/map/map.component";

@Injectable({
  providedIn: 'root'
})
export class SearchService implements OnDestroy{
  private searchResults = new BehaviorSubject<any>({});
  data$ = this.searchResults.asObservable();
  constructor(private ws:WebsocketService) {
    this.ws.on('search').subscribe(data => this.searchResults.next(data))
  }

  ngOnDestroy(): void {
    this.searchResults.unsubscribe();
  }
}
