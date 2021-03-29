import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationStart, Router, } from "@angular/router";
import { Subject } from "rxjs";
import { WebsocketService } from "@services/websocket/websocket.service";
import { ChatService } from "@services/chat/chat.service";
import { NotificationService } from "@services/notification/notification.service";
import { map, takeUntil } from "rxjs/operators";
import { ProfileService } from "@services/profile/profile.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleEvent = new EventEmitter<void>()
  chatActive = false;
  newChatMessage = 0;
  newNotifications = 0;
  login: string = '';
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private ws: WebsocketService,
              private chatService: ChatService,
              private notificationService: NotificationService,
              private ps: ProfileService) {
    this.router.events.pipe(takeUntil((this.destroy$))).subscribe((event => {
      if (event instanceof NavigationStart)
        this.chatActive = event.url.includes('chat/')
    }))
    this.ps.data$.pipe( map(({login}) => {
      if (login) this.login = login
    }), takeUntil(this.destroy$)).subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.chatService.messageCount$.pipe(map(({_all}) => this.newChatMessage = _all),takeUntil(this.destroy$),).subscribe();
    this.notificationService.count$.pipe(map(({all}) => this.newNotifications = all),takeUntil(this.destroy$)).subscribe();
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
