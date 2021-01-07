import { Injectable, OnDestroy } from '@angular/core';
import { WebsocketService } from "@services/websocket/websocket.service";
import { User } from "@services/user/user";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements OnDestroy{
  private profile: User = new User();
  // private profile: User | null = null;
  public subject = new BehaviorSubject(this.profile);
  data$: Observable<User|null> = this.subject.asObservable();
  constructor(
    private ws: WebsocketService
  ) {
    ws.on<User>('profile').subscribe({
      next:(profile) => {
        console.log('get profile', profile);
        this.subject.next(profile);
      },
    })
  }
  update(userProfile: any){
    this.ws.send('profile',
      userProfile
    )
  }
  ngOnDestroy(): void {
    console.log('settings.destroy')
  }
}
