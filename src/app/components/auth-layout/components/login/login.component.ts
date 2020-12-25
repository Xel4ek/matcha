import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpService} from "@services/http.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {WebsocketService} from "@services/websocket/websocket.service";

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
    private router: Router,
    private ws: WebsocketService
  ) {

  }

  ngOnInit(): void {
  }

  onSubmit(data: NgForm) {
    let valid = true;
    Object.entries(this.valid).forEach(([key, entry]) => {
      if (!entry.status) {
        entry.check(data);
        valid = false;
      }
    })
    if (!valid) {

      this.toastr.error('Не все поля заполнены!', 'Ошибка');
    } else {
      this.ws.send('login', {username: data.value.login, password: data.value.pass});
      // this.dataService.postApi('login', {username: data.value.login, password: data.value.pass}, true);
      data.resetForm({...data.value, pass:''});
      this.router.navigate(['/settings']);
    }
  }
}
