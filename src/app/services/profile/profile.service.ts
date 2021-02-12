import { Injectable, OnDestroy } from '@angular/core';
import { WebsocketService } from "@services/websocket/websocket.service";
import { User } from "@services/user/user";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { first, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements OnDestroy{
  // private profile: User = new User();
  private profile: User = new User();
  public subject = new BehaviorSubject(this.profile);
  data$: Observable<User> = this.subject.asObservable();
  constructor(
    private ws: WebsocketService
  ) {
    ws.on<User>('profile').subscribe({
      next:(profile) => {
        console.log('get profile', profile);
        if (profile.login) {
          this.subject.next(profile);
          sessionStorage.setItem('auth', 'true');
        } else {
          sessionStorage.setItem('auth', 'false');
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
    return this.ws.on<any>('profile')
      .pipe(
        first(),
        map(profile  => {
          const login = profile?.login;
          console.log('auth', login);
          return !!login;
        })
      )
  }
  ngOnDestroy(): void {
    console.log('settings.destroy')
  }
}
