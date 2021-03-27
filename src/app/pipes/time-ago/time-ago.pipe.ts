import {Pipe, PipeTransform, NgZone, ChangeDetectorRef, OnDestroy} from "@angular/core";
@Pipe({
  name:'timeAgo',
  pure:false
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {
  private timer?: number | null ;
  constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}
  transform(value: number | string) {
    this.removeTimer();
    const d = new Date(value);
    const now = new Date();
    const seconds = Math.round(Math.abs((now.getTime() - d.getTime())/1000));
    const timeToUpdate = (Number.isNaN(seconds)) ? 1000 : TimeAgoPipe.getSecondsUntilUpdate(seconds) *1000;
    this.timer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.ngZone.run(() => this.changeDetectorRef.markForCheck());
        }, timeToUpdate);
      }
      return null;
    });
    const minutes = Math.round(Math.abs(seconds / 60));
    const hours = Math.round(Math.abs(minutes / 60));
    const days = Math.round(Math.abs(hours / 24));
    const months = Math.round(Math.abs(days/30.416));
    const years = Math.round(Math.abs(days/365));
    if (Number.isNaN(seconds)){
      return '';
    }
    if (seconds <= 45) {
      return 'a few seconds ago';
    }
    if (seconds <= 90) {
      return 'a minute ago';
    }
    if (minutes <= 45) {
      return minutes + ' minutes ago';
    }
    if (minutes <= 90) {
      return 'an hour ago';
    }
    if (hours <= 22) {
      return hours + ' hours ago';
    }
    if (hours <= 36) {
      return 'a day ago';
    }
    if (days <= 25) {
      return days + ' days ago';
    }
    if (days <= 45) {
      return 'a month ago';
    }
    if (days <= 345) {
      return months + ' months ago';
    }
    if (days <= 545) {
      return 'a year ago';
    }
    return years + ' years ago';
  }
  ngOnDestroy(): void {
    this.removeTimer();
  }
  private removeTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }
  private static getSecondsUntilUpdate(seconds:number) {
    const min = 60;
    const hr = min * 60;
    const day = hr * 24;
    if (seconds < min) {
      return 2;
    } else if (seconds < hr) {
      return 30;
    } else if (seconds < day) {
      return 300;
    } else {
      return 3600;
    }
  }
}
