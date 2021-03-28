import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appThrottleClick]'
})
export class ThrottleClickDirective {

  @Input()
  throttleTime = 500;

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('click', ['$event'])
  clickEvent(event: Event) {
    this.elementRef.nativeElement.classList.add('disabled')
    setTimeout(() => {
      this.elementRef.nativeElement.classList.remove('disabled')
    }, this.throttleTime);
  }
}
