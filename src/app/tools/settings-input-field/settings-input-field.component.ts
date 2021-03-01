import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ValidatorService } from "@services/validator.service";
import { WebsocketService } from "@services/websocket/websocket.service";

@Component({
  selector: 'app-settings-input-field[name]',
  templateUrl: './settings-input-field.component.html',
  styleUrls: ['./settings-input-field.component.scss']
})
export class SettingsInputFieldComponent implements OnInit {

  error = '';
  status?: boolean;
  change = false;
  @ViewChild('input') inputValue!: ElementRef;
  @Input() title?: string;
  @Input() value: any;
  @Input() type: string = 'text';
  @Input() validate?: string
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Output() data?: { [index: string]: any };

  constructor(
    private vs: ValidatorService,
    private ws: WebsocketService
  ) {
  }

  ngOnInit(): void {
  }

  reset() {
    this.error = '';
  }

  async check() {
    if (this.change) {
      const value = this.inputValue.nativeElement.value;
      const result = await this.vs.validate(this.validate, value);
      this.error = result?.error ?? '';
      this.status = result.valid;
      if (result.valid && this.value !== value) {
        this.ws.send('profile', {[this.name]: value});
      }
    }
  }
}
