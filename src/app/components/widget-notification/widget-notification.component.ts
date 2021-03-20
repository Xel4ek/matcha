import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-notification[key]',
  templateUrl: './widget-notification.component.html',
  styleUrls: ['./widget-notification.component.scss']
})
export class WidgetNotificationComponent implements OnInit {
  @Input() key!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
