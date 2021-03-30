import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '@services/http/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { WebsocketService } from '@services/websocket/websocket.service';
import { ProfileService } from '@services/profile/profile.service';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

interface FormControl {
  status: boolean;
  error: string;
  check: (form: NgForm) => void;
  reset: () => void;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public valid: { [index: string]: FormControl } = {
    login: {
      status: false,
      error: '',
      check: (form: NgForm) => {
        this.valid.login.status = !!form.value.login.length;
        if (!this.valid.login.status) {
          this.valid.login.error = 'Логин не может быть пустым';
        }
      },
      reset: () => (this.valid.login.error = ''),
    },
    pass: {
      status: false,
      error: '',
      check: (form: NgForm) => {
        this.valid.pass.status = !!form.value.pass.length;
        if (!this.valid.pass.status) {
          this.valid.pass.error = 'Пароль не может быть пустым';
        }
      },
      reset: () => (this.valid.pass.error = ''),
    },
  };
  private destroy$ = new Subject<void>();

  constructor(
    private dataService: HttpService,
    private toastr: ToastrService,
    private ws: WebsocketService,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {}

  onSubmit(data: NgForm): void {
    Object.values(this.valid).map((entry) => {
      if (!entry.status) {
        entry.check(data);
      }
    });
    if (Object.values(this.valid).every((el) => el.status)) {
      this.ws.send('login', {
        username: data.value.login,
        password: data.value.pass,
      });
      data.resetForm({ ...data.value, pass: '' });
      this.profileService.data$
        .pipe(
          tap(({ firstAccess, login }) => {
            if (login) {
              if (firstAccess) {
                this.router.navigate(['./firstAccess']);
              } else {
                this.router.navigate(['./search']);
              }
            }
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    } else {
      this.toastr.error('Не все поля заполнены!', 'Ошибка');
    }
  }
}
