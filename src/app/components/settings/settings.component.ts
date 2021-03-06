import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '@services/profile/profile.service';
import { Subscription } from 'rxjs';
import { WebsocketService } from '@services/websocket/websocket.service';
import { CustomMarker } from '@components/map/map';
import { User } from '@services/user/user';

interface FormControl {
  status: boolean;
  error: string;
  check: (agr: string) => void;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy, AfterViewInit {
  checked = true;
  profile?: User;
  subscription: Subscription;
  strength = 0;
  pass = '';
  marker: { [user: string]: CustomMarker } = {};
  public valid: { [index: string]: FormControl } = {
    pass: {
      status: false,
      error: '',
      check: (pass: string) => this.checkPass(pass),
    },
    confirm: {
      status: false,
      error: '',
      check: (confirm: string) => this.checkConfirm(confirm),
    },
  };

  constructor(
    private profileService: ProfileService,
    private ws: WebsocketService
  ) {
    this.subscription = this.profileService.data$.subscribe((profile) => {
      if (profile && profile.login) {
        this.profile = profile;
        const { latitude: lat, longitude: lng } = profile.coordinates;
        this.marker = {
          [profile.login]: {
            latlng: [lat, lng],
            popup: profile.name.firstName + ' ' + profile.name.lastName,
          },
        };
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  updateGender(gender: string): void {
    this.ws.send('profile', { gender });
  }

  ngAfterViewInit(): void {}

  uploadAbout(aboutMe: string): void {
    this.ws.send('profile', { aboutMe });
  }

  updatePrefGender(sex: string): void {
    this.ws.send('profile', { sex });
  }

  changeLocation({
    latlng: { lat: latitude, lng: longitude },
  }: {
    latlng: { [index: string]: number };
  }): void {
    this.ws.send('profile', {
      coordinates: {
        latitude,
        longitude,
        accuracy: 0,
      },
    });
  }

  editList(
    key: string,
    { action, data }: { action: string; data: string }
  ): void {
    const send = data.replace(/[\W]/g, '');
    if (send) {
      if (action === 'add') {
        this.ws.send('profile', { [key]: '#' + send });
      }
      if (action === 'remove') {
        this.ws.send('profile', {
          ['remove' + key.replace(/^\w/, (c) => c.toUpperCase())]: data,
        });
      }
    }
  }

  checkPassStrength(pass: string): void {
    const res = [
      /[a-z]/.test(pass),
      /\d/.test(pass),
      /[A-Z]/.test(pass),
      /\W/.test(pass),
      pass.length > 6,
    ];
    this.strength = res.filter((el) => el).length;
  }

  checkPass(pass: string): void {
    this.pass = pass;
    if (this.strength < 4) {
      this.valid.pass.error = 'Слишком слабый пароль';
      this.valid.pass.status = false;
    } else {
      this.valid.pass.status = true;
      this.valid.pass.error = '';
      this.updatePassword();
    }
  }

  checkConfirm(confirm: string): void {
    if (this.pass && confirm === this.pass) {
      this.valid.confirm.status = true;
      this.valid.confirm.error = '';
      this.updatePassword();
    } else {
      this.valid.confirm.status = false;
      this.valid.confirm.error = 'Passwords must match';
    }
  }

  reset(key: string): void {
    this.valid[key].error = '';
  }

  locateMe(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          this.ws.send('profile', {
            coordinates: {
              latitude,
              longitude,
            },
          });
        }
      );
    } else {
    }
  }

  send(message: { [key: string]: string }): void {
    this.ws.send('profile', message);
  }

  private updatePassword(): void {
    if (this.valid.confirm.status && this.valid.pass.status) {
      this.ws.send('profile', {
        pass: this.pass,
      });
    }
  }
}
