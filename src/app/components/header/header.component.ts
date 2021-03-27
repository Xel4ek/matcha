import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationStart, Router, } from "@angular/router";
import { Subscription } from "rxjs";
import { WebsocketService } from "@services/websocket/websocket.service";
import { DeviceDetectorService } from "@services/device-detector/device-detector.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleEvent = new EventEmitter<void>()
  subscriber: Subscription;
  chatActive = false;
  mobile: any;

  constructor(private router: Router, private ws: WebsocketService,
              private dd: DeviceDetectorService) {
    this.mobile = this.dd.isMobile$
    this.subscriber = this.router.events.subscribe((event => {
      if (event instanceof NavigationStart)
        this.chatActive = event.url.includes('chat/')
    }))
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.toggleEvent.emit();
  }

  backToChats() {
    this.router.navigate(['/chats']);
  }

  logout() {
    this.ws.send('logout');
  }
}
