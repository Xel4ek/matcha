import { Component, Input, OnInit, Output } from '@angular/core';
import { ValidatorService } from "@services/validator.service";

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})

export class FormFieldComponent implements OnInit {

  error = '';
  status?: boolean;
  @Input() title?: string;
  @Input() value: any;
  @Input() type: string = 'text';
  @Input() validate?: string
  @Input() placeholder:string = '';
  @Output() data?: { [index: string]: any };

  constructor(
    private vs: ValidatorService
  ) {
  }

  ngOnInit(): void {
  }

  reset() {
    this.error = '';
  }

  async check() {
    const  result = await this.vs.validate(this.validate, this.value);
    this.error = result?.error ?? '';
    this.data = {status: result.valid, value: this.value}
  }
}
