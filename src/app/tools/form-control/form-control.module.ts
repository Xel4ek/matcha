import { NgModule } from '@angular/core';
import { FormControlComponent } from './form-control.component';
import { FormFieldModule } from '../form-field/form-field.module';
import { FormFieldComponent } from '../form-field/form-field.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FormControlComponent],
  imports: [CommonModule, FormFieldModule],
  exports: [FormControlComponent, FormFieldComponent],
})
export class FormControlModule {}
