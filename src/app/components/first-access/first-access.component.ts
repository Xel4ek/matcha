import { Component, OnDestroy } from '@angular/core';
import { Subject } from "rxjs";
import { ProfileService } from "@services/profile/profile.service";
import { map, takeUntil } from "rxjs/operators";
import { User } from "@services/user/user";
import { WebsocketService } from "@services/websocket/websocket.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-first-access',
  templateUrl: './first-access.component.html',
  styleUrls: ['./first-access.component.scss']
})
export class FirstAccessComponent implements OnDestroy {
  profile?: User;
  updating = false;
  private destroy$ = new Subject<void>();
  constructor(
    private profileService: ProfileService,
    private ws: WebsocketService,
    private router: Router
  ) {
    profileService.data$.pipe(map(profile => {
      if (!(profile.firstAccess)) {
        this.router.navigate(['/search']);
      }
      this.profile = profile;
    }),takeUntil(this.destroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  send(message: { [key: string]: string }) {
    const key = Object.keys(message)[0];
    if (this.profile && key) {
      if (key === ('firstName' || 'lastName')) {
        this.profile.name[key] = message[key];
      } else if (key === 'birthDay') {
        this.profile[key] = new Date(message[key]);
      }
      else  {
        this.profile[key] = message[key];
      }
    }
  }

  updatePhoto(photoInfo: { [key: string]: string }) {
    if(this.profile) {
      const {photo, removePhoto, profilePhoto} = photoInfo;
      if (photo) {
        this.profile?.photo.paths.push(photo);
        if (this.profile.photo.paths.length === 1) {
          this.profile.photo.profilePhoto = this.profile.photo.paths[0];
        }
      }
      if (removePhoto) {
        this.profile.photo.paths = this.profile.photo.paths.filter((photo: string) => photo !== removePhoto);
        if (removePhoto === this.profile.photo.profilePhoto) {
          this.profile.photo.profilePhoto = this.profile.photo.paths[0] ?? '';
        }
      }
      if(profilePhoto) {
        this.profile.photo.profilePhoto = profilePhoto;
      }
    }
  }

  uploadAbout(aboutMe: string) {
    if( this.profile)
      this.profile.aboutMe = aboutMe;
  }

  updateGender(gender: string) {
    if( this.profile)
      this.profile.gender = gender;
  }

  updatePrefGender(sex: string) {
    if( this.profile)
      this.profile.sex = sex;
  }

  logout() {
    this.ws.send('logout');
  }

  get firstAccess () {
    const p = this.profile
    return Object.values({
        firstName: p?.name.firstName,
        lastName: p?.name.lastName,
        birthDay: !!p?.birthDay,
        sex: p?.sex,
        gender: p?.gender,
        photo: p?.photo.paths.length > 0,
        aboutMe: p?.aboutMe }
      ).every((element) => element);
  }
  sendFirstAccessData() {
    if(this.profile && this.firstAccess) {
      this.updating = true;
      const {firstName, lastName, birthDay, sex, gender, photo: photos, aboutMe} = this.profile;
      this.ws.send('profile', {firstName});
      this.ws.send('profile', {lastName});
      this.ws.send('profile', {birthDay});
      this.ws.send('profile', {sex});
      this.ws.send('profile', {gender});
      this.ws.send('profile', {aboutMe});
      photos?.paths.map(((photo: string) => {
        this.ws.send('profile', {photo, isProfile: photo === photos.profilePhoto})
      }))
      this.ws.send('profile', {firstAccess: false});
    }
  }
}
