import { Injectable, OnDestroy } from '@angular/core';
import { WebsocketService } from "@services/websocket/websocket.service";
import { User } from "@services/user/user";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { first, map, takeUntil, tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProfileService implements OnDestroy {
  public subject = new BehaviorSubject<User>(new User());
  data$: Observable<User> = this.subject.asObservable();
  private destroy$ = new Subject<void>();
  constructor(
    private ws: WebsocketService,
    private router: Router,
  ) {
    ws.on<User>('profile').pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: (profile) => {
        console.log(profile);
        profile.firstAccess = true;
          this.subject.next(profile);
        if (!profile?.login)
          router.navigate(['/login']);
      },
    })
  }

  update(userProfile: any) {
    this.ws.send('profile',
      userProfile
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
