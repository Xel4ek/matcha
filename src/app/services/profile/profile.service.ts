import { Injectable, OnDestroy } from '@angular/core';
import { WebsocketService } from '@services/websocket/websocket.service';
import { User } from '@services/user/user';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileService implements OnDestroy {
  public subject = new ReplaySubject<User>(1);
  data$: Observable<User> = this.subject.asObservable();
  private destroy$ = new Subject<void>();

  constructor(private ws: WebsocketService, private router: Router) {
    ws.on<User>('profile')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (profile) => {
          this.subject.next(profile);
          if (!profile?.login) router.navigate(['/login']);
        },
      });
  }

  update(userProfile: any) {
    this.ws.send('profile', userProfile);
  }

  ngOnDestroy(): void {
    this.subject.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
