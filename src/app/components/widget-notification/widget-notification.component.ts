import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-widget-notification[key]',
  templateUrl: './widget-notification.component.html',
  styleUrls: ['./widget-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class WidgetNotificationComponent {
  @Input() key?: number;
}
