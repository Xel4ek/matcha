import { Injectable } from '@angular/core';
import { WebsocketService } from "@services/websocket/websocket.service";
import { first } from "rxjs/operators";

interface ValidateStatus {
  valid: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  private availableValidators: { [index: string]: Function } = {
    login: (data: string) => this.login(data),
    mail: (data: string) => this.mail(data),
  }

  constructor(
    private ws: WebsocketService
  ) {
  }

  async login(login: string): Promise<ValidateStatus> {
    if (!login || login.length < 3 || login.length > 18) {
      return {valid: false, error: 'Допустимый логин 3-18 симовлов'}
    }
    const letterStart = /^[a-z]/;
    if (!letterStart.test(login.toLowerCase())) return {valid: false, error: 'Логин должен начинаться с буквы'}
    const loginRe = /^[\w\d]*$/i;
    if (!loginRe.test(login)) return {valid: false, error: 'Используйте буквы и цифры'}
    let result = this.ws.on<boolean>('occupied').pipe(first()).toPromise()
      .then((data: boolean) => {
        return data ? {valid: false, error: 'Логин уже занят'} : {valid: true}
      });
    this.ws.send('occupied', {login});
    return result;
  }

  async mail(mail: string): Promise<ValidateStatus> {
    const emailRe = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!emailRe.test(mail)) return {valid: false, error: 'Некорректный E-mail'};
    let result = this.ws.on<boolean>('occupied').pipe(first()).toPromise()
      .then((data: boolean) => data ? {valid: false, error: 'E-mail уже занят'} : {valid: true});
    this.ws.send('occupied', {email: mail});
    return result;
  }

  async validate(action?: string, value?: string) {
    if (action && action in this.availableValidators) {
      return await this.availableValidators[action](value);
    } else
      return {valid: true}
  }
}
