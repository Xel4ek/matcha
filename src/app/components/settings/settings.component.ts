import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import {User} from "@services/user/user";
import { ProfileService } from "@services/profile/profile.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  profile: User | null = null;
  subscription: Subscription | null = null;

  private settingsForm = {}
  public test: any;
  constructor(
    private profileService:ProfileService
  ) {
    this.subscription = this.profileService.data$.subscribe(profile =>this.profile = profile);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }
  onSubmit(form: NgForm):void {
    console.log(form.value)
    console.log(this.test);
  }
  validateTest(data: any){
    console.log('from setting', data);
    return 567;
  }
}
