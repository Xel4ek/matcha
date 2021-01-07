import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsInputFieldComponent } from './settings-input-field.component';

describe('SettingsInputFieldComponent', () => {
  let component: SettingsInputFieldComponent;
  let fixture: ComponentFixture<SettingsInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsInputFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
