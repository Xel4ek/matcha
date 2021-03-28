import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NotificationMessage } from "@components/notificationsList/notification.interface";
import { NotificationService } from "@services/notification/notification.service";
import { DeviceDetectorService } from "@services/device-detector/device-detector.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-notification[entry]',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() entry!: NotificationMessage;
  private destroy$ = new Subject<void>();
  constructor(private ns: NotificationService,
              private deviceDetector: DeviceDetectorService) {

  }
  remove() {
    this.ns.edit({id: this.entry.id, action: 'remove'});
  }
  checked() {
    if(!this.entry.checked) {
      this.ns.edit({id: this.entry.id, action: 'edit'});
    }
  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }

  ngAfterViewInit(): void {
    this.deviceDetector.isMobile$.pipe(takeUntil((this.destroy$))).subscribe(isMobile => {
      if (isMobile)
        this.checked();
    })
  }

}
