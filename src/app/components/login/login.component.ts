import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DataService} from "@services/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any;
  constructor(
    private dataService: DataService
  ) {

  }

  ngOnInit(): void {
  }

  onSubmit(data: NgForm) {
    console.log(data.value);
    data.resetForm();
    this.dataService.getData('logout');
  }
}
