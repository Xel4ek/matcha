import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import { Router} from "@angular/router";
import {WebsocketService} from "@services/websocket/websocket.service";
import {first} from "rxjs/operators";

interface FormControl {
  status: boolean,
  error: string,
  check: Function,
  reset: Function
}

@Component({
  selector: 'app-restore',
  templateUrl: './restore.component.html',
  styleUrls: ['./restore.component.scss']
})
export class RestoreComponent implements OnInit {
  public valid: { [index: string]: FormControl } = {
    mail: {
      status: false, error: '', check: (form: NgForm) => {
        const mail = form.value.mail;
        const emailRe = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if(!(this.valid.mail.status = (!!mail && emailRe.test(mail)))) {
          this.valid.mail.error = 'Некорректный E-mail';
        }
      }, reset: () =>
        this.valid.mail.error = ''

    }
  }
  constructor(
    private ws: WebsocketService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onSubmit(data:NgForm): void {
    this.valid.mail.check(data);
    if (this.valid.mail.status) {
      this.ws.send('restore', {email: data.value.mail})
      this.router.navigate(['/login']);
    } else {
      this.toastr.error('Некоректный E-mail', 'Ошибка');
    }
  }
}
