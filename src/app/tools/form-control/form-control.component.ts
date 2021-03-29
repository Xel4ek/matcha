import { AfterViewInit, Component, ContentChildren, EventEmitter, OnInit, Output, QueryList, } from '@angular/core';
import { FormFieldComponent } from "../form-field/form-field.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit, AfterViewInit {
  @ContentChildren(FormFieldComponent) _fields!: QueryList<FormFieldComponent>;
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private plugin: ToastrService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    const results: { [index: string]: string }[] = await Promise.all(
      this._fields.map((el) => {
        return el.check();
      }))
    if (results.every((data) => data.status)) {
      const data: { [index: string]: string } = {};
      results.forEach((el) => data[el.name] = el.value);
      this.formSubmit.emit(data);
    } else {
      this.plugin.error('Не все поля заполнены', 'Ошибка!')
    }
  }
}
