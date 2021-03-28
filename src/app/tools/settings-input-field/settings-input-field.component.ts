import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ValidatorService } from "@services/validator/validator.service";

@Component({
  selector: 'app-settings-input-field[name]',
  templateUrl: './settings-input-field.component.html',
  styleUrls: ['./settings-input-field.component.scss']
})
export class SettingsInputFieldComponent {

  error = '';
  status?: boolean;
  @ViewChild('input') inputValue!: ElementRef;
  @Input() title?: string;
  @Input() value: any;
  @Input() type: string = 'text';
  @Input() validate?: string
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Output() result = new EventEmitter();

  constructor(
    private vs: ValidatorService,
  ) {
  }


  reset() {
    this.error = '';
  }

  async apply() {
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
      this.result.emit({[this.name]: value});
    }
  }

}
