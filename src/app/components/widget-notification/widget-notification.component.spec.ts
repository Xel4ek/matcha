import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetNotificationComponent } from './widget-notification.component';

describe('WidgetNotificationComponent', () => {
  let component: WidgetNotificationComponent;
  let fixture: ComponentFixture<WidgetNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
