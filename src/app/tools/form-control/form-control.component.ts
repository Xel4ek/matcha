import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { FormFieldComponent } from '../form-field/form-field.component';
import { ToastrService } from 'ngx-toastr';
import { CheckResultInterface } from '@tools/form-control/check-result';

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
})
export class FormControlComponent implements OnInit, AfterViewInit {
  @ContentChildren(FormFieldComponent) fields!: QueryList<FormFieldComponent>;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private plugin: ToastrService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    const results: CheckResultInterface[] = await Promise.all(
      this.fields.map((el) => {
        return el.check();
      })
    );
    if (results.every((data) => data.status)) {
      const data: { [index: string]: string } = {};
      // @ts-ignore
      results.forEach((el) => (data[el.name] = el.value));
      this.formSubmit.emit(data);
    } else {
      this.plugin.error('Не все поля заполнены', 'Ошибка!');
    }
  }
}
