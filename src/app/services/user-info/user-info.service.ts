import { Injectable, OnDestroy } from '@angular/core';
import { WebsocketService } from '@services/websocket/websocket.service';
import { UserInfo } from '@services/user-info/user-info';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService implements OnDestroy {
  private subject: BehaviorSubject<{
    [index: string]: UserInfo;
  }> = new BehaviorSubject({});
  data$: Observable<{
    [index: string]: UserInfo;
  }> = this.subject.asObservable();
  private destroy$ = new Subject<void>();

  constructor(private ws: WebsocketService) {
    ws.on<UserInfo>('userInfo')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          if (user.login) {
            const data = this.subject.getValue();
            data[user.login] = this.prepareData(user);
            this.subject.next(data);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subject.complete();
  }

  getUser(login: string): void {
    const data = this.subject.getValue();
    if (!data[login] || !data[login].invited) {
      data[login] = new UserInfo({ invited: true });
      this.subject.next(data);
      this.ws.send('userInfo', { login });
    }
  }

  private prepareData(user: UserInfo): UserInfo {
    if (!user?.photo?.paths?.length) {
      user?.photo?.paths?.push(
        'assets/img/4e73208be9f326816a787de2e04db80a.jpg'
      );
    } else {
      const paths = user.photo.paths;
      const profilePhoto = user.photo.profilePhoto;
      user.index = +paths.findIndex(
        (path: string) => path.indexOf(profilePhoto) !== -1
      );
    }
    if (user) {
      user.age = Math.floor(
        (new Date().getTime() - new Date(user.birthDay).getTime()) /
          (24 * 3600 * 365.25 * 1000)
      );
    }
    user.invited = true;
    return user;
  }
}
