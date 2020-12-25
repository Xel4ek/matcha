import {Component, OnInit} from '@angular/core';
import {NgForm, NgModel} from "@angular/forms";
import {HttpService} from "@services/http.service";
import {ValidatorService} from "@services/validator.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {WebsocketService} from "@services/websocket/websocket.service";

interface FormControl {
  status: boolean,
  error: string,
  check: Function
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public valid: { [index: string]: FormControl } = {
    login: {status: false, error: '', check: (form: NgForm) => this.checkLogin(form)},
    pass: {status: false, error: '', check: () => this.checkPass()},
    confirm: {status: false, error: '', check: (form: NgForm) => this.checkConfirm(form)},
    mail: {status: false, error: '', check: (form: NgForm) => this.checkMail(form)}
  };
  public strength: number = 5;

  constructor(
    private ws: WebsocketService,
    private validate: ValidatorService,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  async checkLogin(form: NgForm): Promise<void> {
    const {valid, error} = await this.validate.login(form.value.login);
    console.log('login', valid, error);
    this.valid.login.status = valid;
    this.valid.login.error = error ?? '';
  }

  resetLogin(): void {
    this.valid.login.error = '';
  }

  async checkMail(form: NgForm): Promise<void> {
    const {valid, error} = await this.validate.mail(form.value.mail);
    this.valid.mail.status = valid;
    this.valid.mail.error = error ?? '';
  }

  resetMail(): void {
    this.valid.mail.error = '';
  }

  checkConfirm(form: NgForm): void {
    const {pass, confirm} = form.value;
    if (!!pass) {
      this.valid.confirm.status = pass === confirm;
      this.valid.confirm.error = pass === confirm ? '' : 'Пароли должны совпадать';
    }
  }

  resetConfirm(): void {
    this.valid.confirm.error = '';
  }

  checkPassStrength(form: NgForm): void {
    const pass = form.value.pass;
    const res = [/[a-z]/.test(pass), /\d/.test(pass), /[A-Z]/.test(pass), /\W/.test(pass), pass.length > 6];
    this.strength = res.filter(el => el).length;
  }

  checkPass(): void {
    if (this.strength < 3) {
      this.valid.pass.error = 'Слишком слабый пароль';
      this.valid.pass.status = false;
    } else {
      this.valid.pass.status = true;
    }
  }

  resetPass(): void {
    this.valid.pass.error = '';
  }

  onSubmit(data: NgForm): void {
    // console.log(data.value);
    let valid = true;
    this.valid.confirm.check(data);
    Object.entries(this.valid).forEach(([key, entry]) => {
      if (!entry.status) {
        entry.check(data);
        valid = false;
      }
    })
    if (!valid) {
      this.toastr.error('Не все поля заполнены!', 'Ошибка');
    } else {
      const {login, pass, mail} = data.value;
      data.resetForm();
      Object.keys(this.valid).forEach(key => {
        this.valid[key].status = false;
        this.valid[key].error = ''
      });
      this.ws.send('register', {
        username: login,
        password: pass,
        email: mail,
      });
      // this.http.postApi('register', {
      //   username: login,
      //   password: pass,
      //   email: mail,
      // }, true);
      this.router.navigate(['/settings']);
    }
  }
}
