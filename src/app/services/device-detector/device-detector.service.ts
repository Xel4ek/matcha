import { Injectable, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { AsyncSubject, BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService implements OnDestroy{
  private destroy = new Subject<void>();
  private isMobileSubject = new BehaviorSubject<boolean>(false);
  isMobile$ = this.isMobileSubject.asObservable();
  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.XSmall
    ]).pipe(takeUntil(this.destroy))
      .subscribe(result => {
        console.log(Breakpoints);
        this.isMobileSubject.next(result.matches);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
