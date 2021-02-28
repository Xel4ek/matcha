import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, } from "@angular/router";
import {Location} from "@angular/common";
import { filter, map, tap } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleEvent = new EventEmitter<void>()
  subscriber: Subscription;
  chatActive = false;
  constructor(private router: Router) {
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
  }
}
