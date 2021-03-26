import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from "@angular/material/sidenav";
import { NotificationService } from "@services/notification/notification.service";
import { DeviceDetectorService } from "@services/device-detector/device-detector.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ProfileService } from "@services/profile/profile.service";
import { ChatService } from "@services/chat/chat.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatSidenav) sideNav?: MatSidenav;
  mode: MatDrawerMode = 'side';
  notificationCount?: { [key: string]: number };
  newMessagesCount: number = 0;
  private destroy = new Subject<void>();

  constructor(private ns: NotificationService,
              private deviceDetector: DeviceDetectorService,
              private ps: ProfileService,
              private chatService: ChatService) {
    deviceDetector.isMobile$.pipe(takeUntil(this.destroy)).subscribe(isMobile => {
        this.mode = isMobile ? 'over' : 'side';
      }
    )
  }

  ngAfterViewInit(): void {
    // setTimeout(() => this.sideNav?.toggle(),0);
  }

  testFunction(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log('geo', longitude, latitude);
      });
    }
  }

  ngOnInit() {
    this.ns.fetch();
    this.ps.data$.pipe(takeUntil(this.destroy)).subscribe(({activeChats}) => activeChats.map(user => this.chatService.getHistory(user)));
    this.ns.count$.pipe(takeUntil(this.destroy)).subscribe(count => this.notificationCount = count);
    this.chatService.messageCount$.pipe(takeUntil(this.destroy)).subscribe(({ _all }) => this.newMessagesCount = _all);
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
