import { Component, Input, OnInit, Output } from '@angular/core';
import { ValidatorService } from '@services/validator/validator.service';
import { CheckResultInterface } from '@tools/form-control/check-result';

@Component({
  selector: 'app-form-field[name]',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements OnInit {
  error = '';
  status?: boolean;
  @Input() title?: string;
  @Input() value: any;
  @Input() type = 'text';
  @Input() validate?: string;
  @Input() placeholder = '';
  @Input() name = '';
  @Output() data?: CheckResultInterface;

  constructor(private vs: ValidatorService) {}

  ngOnInit(): void {}

  reset(): void {
    this.error = '';
  }

  async check(): Promise<CheckResultInterface> {
    const result = await this.vs.validate(this.validate, this.value);
    this.error = result?.error ?? '';
    this.status = result.valid;
    this.data = { status: result.valid, value: this.value, name: this.name };
    return this.data;
  }
}
