import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements AfterViewInit, OnInit, OnDestroy{
  @ViewChild(MatSidenav) sideNav? :MatSidenav;
  mode: MatDrawerMode = 'side';
  notificationCount: number = 0;
  constructor(public breakpointObserver: BreakpointObserver) {

  }

  ngAfterViewInit(): void {
    // setTimeout(() => this.sideNav?.toggle(),0);
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
  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 599px)'])
      .subscribe((state: BreakpointState) => {
          this.mode = state.matches ? 'side' : 'over';
      });
  }
  hideSidenav(){
    if(this.mode === 'over') {
      this.sideNav?.toggle();
    }
  }

  ngOnDestroy(): void {
  }
}
