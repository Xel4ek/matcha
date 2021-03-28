import { Component, OnDestroy } from '@angular/core';
import { Subject } from "rxjs";
import { ProfileService } from "@services/profile/profile.service";
import { map, takeUntil } from "rxjs/operators";
import { User } from "@services/user/user";
import { WebsocketService } from "@services/websocket/websocket.service";

@Component({
  selector: 'app-first-access',
  templateUrl: './first-access.component.html',
  styleUrls: ['./first-access.component.scss']
})
export class FirstAccessComponent implements OnDestroy {
  profile?: User;
  private destroy$ = new Subject<void>();

  constructor(
    private profileService: ProfileService,
    private ws: WebsocketService
  ) {
    profileService.data$.pipe(takeUntil(this.destroy$), map(profile => {
      this.profile = profile;
    })).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  send(message: { [key: string]: string }) {
    console.log(message)
  }

  updatePhoto(photoInfo: { [key: string]: string }) {
    console.log(photoInfo)
  }

  uploadAbout(text: string) {
    console.log(text);
  }

  updateGender(gender: string) {
    console.log(gender)
  }

  updatePrefGender(gender: string) {
    console.log(gender);
  }

  logout() {
    this.ws.send('logout');
  }
}
