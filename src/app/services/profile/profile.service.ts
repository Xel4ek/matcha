import { Injectable, OnDestroy } from '@angular/core';
import { WebsocketService } from "@services/websocket/websocket.service";
import { User } from "@services/user/user";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { first, map, tap } from "rxjs/operators";
import { Route, Router } from "@angular/router";
import { ChatService } from "@services/chat/chat.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements OnDestroy{
  public subject = new BehaviorSubject<User>(new User());
  data$: Observable<User> = this.subject.asObservable();
  constructor(
    private ws: WebsocketService,
    private router: Router,
  ) {
    ws.on<User>('profile').subscribe({
      next:(profile) => {
        if (profile?.login) {
          this.subject.next(profile);
        } else {
          // @ts-ignore
          this.subject.next({login: null});
          router.navigate(['/login']);
        }
      },
    })
  }
  update(userProfile: any){
    this.ws.send('profile',
      userProfile
    )
  }
  auth(): Observable<boolean> {
    return this.ws.on<User>('profile')
      .pipe(
        first(),
        map(profile  => {
          const login = profile?.login;
          return !!login;
        })
      )
  }
  ngOnDestroy(): void {
  }
}
