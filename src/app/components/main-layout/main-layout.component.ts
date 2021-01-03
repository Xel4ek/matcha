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
}
