import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from "@angular/material/sidenav";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements AfterViewInit{
  @ViewChild(MatSidenav) sideNav? :MatSidenav;
  constructor() { }

  ngAfterViewInit(): void {
    setTimeout(() => this.sideNav?.toggle(),0);
  }
  testFunction(): void {
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log('geo', longitude, latitude);
      });
    } else {
      console.log("No support for geolocation")
    }

  }
}
