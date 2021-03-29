import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from "@angular/material/sidenav";
import { NotificationService } from "@services/notification/notification.service";
import { DeviceDetectorService } from "@services/device-detector/device-detector.service";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { ProfileService } from "@services/profile/profile.service";
import { ChatService } from "@services/chat/chat.service";
import { WebsocketService } from "@services/websocket/websocket.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav) sideNav?: MatSidenav;
  mode: MatDrawerMode = 'side';
  notificationCount?: { [key: string]: number };
  newMessagesCount: number = 0;
  private destroy = new Subject<void>();

  constructor(private ns: NotificationService,
              private deviceDetector: DeviceDetectorService,
              private ps: ProfileService,
              private chatService: ChatService,
              private ws: WebsocketService) {
    deviceDetector.isMobile$.pipe(takeUntil(this.destroy)).subscribe(isMobile => {
        this.mode = isMobile ? 'over' : 'side';
      }
    )
  }


  ngOnInit() {
    this.ps.data$.pipe(take(1))
      .subscribe(({activeChats, login}) => {
          this.ws.send('notification', {since: 0})
          this.ws.send('userInfo', {login});
          activeChats?.map(user => this.chatService.getHistory(user));
        }
      );
    this.ns.count$.pipe(takeUntil(this.destroy)).subscribe(count => this.notificationCount = count);
    this.chatService.messageCount$.pipe(takeUntil(this.destroy)).subscribe(({_all}) => this.newMessagesCount = _all);
  }

  hideSidenav() {
    if (this.mode === 'over') {
      this.sideNav?.toggle();
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
