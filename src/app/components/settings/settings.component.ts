import { AfterViewInit, Component, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {User} from "@services/user/user";
import { ProfileService } from "@services/profile/profile.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { FormControlComponent } from "../../tools/form-control/form-control.component";
import { WebsocketService } from "@services/websocket/websocket.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(FormControlComponent) formControl?: FormControlComponent;
  checked: boolean = true;
  profile?: User;
  subscription: Subscription | null = null;
  public test: any;
  constructor(
    private profileService:ProfileService,
    private ws: WebsocketService
  ) {
    this.subscription = this.profileService.data$.subscribe(profile => this.profile = profile);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }
  onSubmit(event:Event) {
    console.log('settings', event, typeof event);
    if(this.profile) {
      this.profileService.update({...this.profile, ...event});
    }
  }
  validateTest(data: any){
    console.log('from setting', data);
    return 567;
  }
  updateGender(gender: string) {
    this.ws.send('profile', {gender});
  }
  ngAfterViewInit(): void {
  }
  uploadAbout(aboutMe: string){
    this.ws.send('profile', {aboutMe})
  }
  changeLocation({latlng: {lat, lng}}: {[index:string]: {[index:string]: number}}) {
    this.ws.send('profile', {
      coordinates: {
        latitude: lat,
        longitude: lng,
        accuracy: 0,
      }
    })
  }
}
