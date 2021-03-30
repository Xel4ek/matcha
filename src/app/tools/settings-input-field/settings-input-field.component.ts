import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ValidatorService } from '@services/validator/validator.service';

@Component({
  selector: 'app-settings-input-field[name]',
  templateUrl: './settings-input-field.component.html',
  styleUrls: ['./settings-input-field.component.scss'],
})
export class SettingsInputFieldComponent {
  error = '';
  status?: boolean;
  @ViewChild('input') inputValue!: ElementRef;
  @Input() title?: string;
  @Input() value: any;
  @Input() type = 'text';
  @Input() validate?: string;
  @Input() placeholder = '';
  @Input() name = '';
  @Output() resultSettings = new EventEmitter();

  constructor(private vs: ValidatorService) {}

  reset(): void {
    this.error = '';
  }

  async apply(): Promise<void> {
    let value = '';
    if (this.type === 'date') {
      value = this.inputValue.nativeElement.valueAsNumber;
    } else {
      value = this.inputValue.nativeElement.value;
    }
    const result = await this.vs.validate(this.validate, value);
    this.error = result?.error ?? '';
    this.status = result.valid;
    if (result.valid && this.value !== value) {
      this.resultSettings.emit({ [this.name]: value });
    }
  }
}
