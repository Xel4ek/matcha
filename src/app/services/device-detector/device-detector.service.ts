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
      '(max-width: 480px)'
    ]).pipe(takeUntil(this.destroy))
      .subscribe(result => {
        this.isMobileSubject.next(result.matches);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
