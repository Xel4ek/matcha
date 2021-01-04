import {
  AfterViewInit,
  Component,
  ContentChildren,
  OnInit,
  QueryList,
} from '@angular/core';
import { FormFieldComponent } from "../form-field/form-field.component";

@Component({
  selector: 'app-form-control',
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss']
})
export class FormControlComponent implements OnInit, AfterViewInit {
  @ContentChildren(FormFieldComponent) _fields!: QueryList<FormFieldComponent>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this._fields);
  }
  onSubmit(event: Event){
    event.preventDefault();
    // console.log(this._fields);
    this._fields.map((el)=> {
      console.log(el)
      el.check();
    })
  }
}
