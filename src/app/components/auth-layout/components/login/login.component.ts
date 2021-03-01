import { Component, OnDestroy, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpService} from "@services/http.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {WebsocketService} from "@services/websocket/websocket.service";
import { ProfileService } from "@services/profile/profile.service";
import { Subscription } from "rxjs";

interface FormControl {
  status: boolean,
  error: string,
  check: Function,
  reset: Function
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public valid: { [index: string]: FormControl } = {
    login: {
      status: false, error: '', check: (form: NgForm) => {
        if(!(this.valid.login.status = !!form.value.login.length)){
          this.valid.login.error = 'Логин не может быть пустым';
        }
      }, reset: () =>
        this.valid.login.error = ''
    },
    pass: {
      status: false, error: '', check: (form: NgForm) => {
        if(!(this.valid.pass.status = !!form.value.pass.length)){
          this.valid.pass.error = 'Пароль не может быть пустым';
        }
      }, reset: () =>
        this.valid.pass.error = ''

    },
  };

  constructor(
    private dataService: HttpService,
    private toastr: ToastrService,
    private ws: WebsocketService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  onSubmit(data: NgForm) {
    Object.entries(this.valid).map(([key, entry]) => {
      if (!entry.status) {
        entry.check(data);
      }
    })
    if (Object.values(this.valid).every((el) => el.status)) {
      this.ws.send('login', {username: data.value.login, password: data.value.pass});
      data.resetForm({...data.value, pass: ''});
      this.router.navigate(['./settings']);
    } else {
      this.toastr.error('Не все поля заполнены!', 'Ошибка');
    }
  }

}
