import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
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
    mail: {status: false, error: '', check: (form: NgForm) => this.checkMail(form)},
    firstName: {status: false, error: '', check: (form: NgForm) => this.checkFirstName(form)},
    lastName: {status: false, error: '', check: (form: NgForm) => this.checkLastName(form)},
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
  reset(key: string): void {
    this.valid[key].error = '';
  }

  async checkMail(form: NgForm): Promise<void> {
    const {valid, error} = await this.validate.mail(form.value.mail);
    this.valid.mail.status = valid;
    this.valid.mail.error = error ?? '';
  }

  checkConfirm(form: NgForm): void {
    const {pass, confirm} = form.value;
    if (!!pass) {
      this.valid.confirm.status = pass === confirm;
      this.valid.confirm.error = pass === confirm ? '' : 'Пароли должны совпадать';
    }
  }

  checkPassStrength(form: NgForm): void {
    const pass = form.value.pass;
    const res = [/[a-z]/.test(pass), /\d/.test(pass), /[A-Z]/.test(pass), /\W/.test(pass), pass.length > 6];
    this.strength = res.filter(el => el).length;
  }
  checkFirstName(form: NgForm): void {
    const valid = form.value.firstName.trim().length !== 0;
    this.valid.firstName.status = valid;
    this.valid.firstName.error = valid ? '' : 'Cannot be empty';
  }

  checkLastName(form: NgForm): void {
    const valid = form.value.lastName.trim().length !== 0;
    this.valid.lastName.status = valid;
    this.valid.lastName.error = valid ? '' : 'Cannot be empty';

  }
  checkPass(): void {
    if (this.strength < 3) {
      this.valid.pass.error = 'Слишком слабый пароль';
      this.valid.pass.status = false;
    } else {
      this.valid.pass.status = true;
    }
  }


  onSubmit(data: NgForm): void {
    // console.log(data.value);
    this.valid.confirm.check(data);
    Object.entries(this.valid).map(([key, entry]) => {
      if (!entry.status) {
        entry.check(data);
      }
    })
    if (Object.values(this.valid).every((el) => el.status)) {
      const {login: username, pass: password, mail: email, firstName, lastName} = data.value;
      data.resetForm();
      Object.keys(this.valid).forEach(key => {
        this.valid[key].status = false;
        this.valid[key].error = ''
      });
      this.ws.send('register', {
        username,
        password,
        email,
        name: {
          firstName,
          lastName,
        }
      });
      this.router.navigate(['/settings']);
    } else {
      this.toastr.error('Не все поля заполнены!', 'Ошибка');
    }
  }
}
